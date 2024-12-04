import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Konfiguration der Wolken
const cloudsConfig: {
    color: number;
    size: number;
    particleAmount: number;
    offset: [number, number, number];
    opacity: number;
}[] = [
    {
        color: 0x0020ff,
        size: 0.15,
        particleAmount: 500,
        offset: [0, 0, 0],
        opacity: 0.8,
    },
    {
        color: 0x50ffa5,
        size: 0.12,
        particleAmount: 580,
        offset: [-1, 0.5, -0.5],
        opacity: 0.7,
    },
    {
        color: 0x0066ff, 
        size: 0.13,
        particleAmount: 500,
        offset: [-1.3, 0.2, 1],
        opacity: 0.8,
    },
    {
        color: 0x46fdee,
        size: 0.15,
        particleAmount: 550,
        offset: [1.2, -0.3, -0.8],
        opacity: 0.8,
    },
    {
        color: 0xb4f8ff,
        size: 0.15,
        particleAmount: 560,
        offset: [0.5, -1.5, 0.2],
        opacity: 0.8,
    },
    {
        color: 0x465dff, 
        size: 0.14,
        particleAmount: 590,
        offset: [-0.5, 1.3, -1.2],
        opacity: 0.6,
    },
    {
        color: 0x29f6f6,
        size: 0.18,
        particleAmount: 580,
        offset: [0.8, 0, 1.3],
        opacity: 0.7,
    },
];

// Debounce-Funktion zur Optimierung von Resize-Events
const debounce = <F extends (...args: any[]) => any>(
    func: F,
    delay: number
) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<F>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
};

const BackgroundAnimation: React.FC = () => {
    const markerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!markerRef.current) return;

        // THREE.js Grundelemente
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            35,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        markerRef.current.appendChild(renderer.domElement);

        camera.position.z = 3;

        const particleTexture = new THREE.TextureLoader().load(
            '/images/round-particle.png'
        );

        // Funktion zum Erstellen einer Partikelwolke
        const createParticleCloud = (
            color: number,
            size: number,
            particleAmount: number,
            offset: [number, number, number]
        ) => {
            const geometry = new THREE.BufferGeometry();
            const material = new THREE.PointsMaterial({
                color,
                size,
                map: particleTexture,
                transparent: true,
                opacity: 0.5,
                alphaTest: 0.1, // Nur sichtbare Pixel rendern
                depthWrite: false, // Transparenz überlagert sich korrekt
            });

            const positions = new Float32Array(particleAmount * 3); // Optimiert für BufferAttribute
            for (let i = 0; i < particleAmount; i++) {
                const r = Math.random() * 0.7 + 0.03; // Radius
                const theta = Math.random() * Math.PI * 2; // Winkel um die Z-Achse
                const phi = Math.acos((Math.random() - 0.5) * 2); // Winkel um die Y-Achse

                const x = r * Math.sin(phi) * Math.cos(theta) + offset[0];
                const y = r * Math.sin(phi) * Math.sin(theta) + offset[1];
                const z = r * Math.cos(phi) + offset[2];

                positions.set([x, y, z], i * 3);
            }
            geometry.setAttribute(
                'position',
                new THREE.BufferAttribute(positions, 3)
            );

            return new THREE.Points(geometry, material);
        };

        // Verbindungslinien mit zufälligem Sampling und max. Verbindungen
        const createConnectingLines = (
            clouds: THREE.Points[],
            maxConnections: number,
            maxTotalLines: number
        ) => {
            const lineMaterial = new THREE.LineBasicMaterial({
                color: 0x00ff00,
                transparent: true,
                opacity: 0.2,
            });

            // Speichert die Anzahl der Verbindungen pro Partikel
            const connectionMap: Map<string, number> = new Map();
            let totalLines = 0; // Zählt die Gesamtanzahl der Linien

            clouds.forEach((cloud1, index1) => {
                const positions1 = cloud1.geometry.attributes.position
                    .array as Float32Array;

                // Iteriere über alle Partikel im ersten Cloud
                for (let i = 0; i < positions1.length; i += 3) {
                    if (totalLines >= maxTotalLines) return; // Beende, wenn Gesamtlimit erreicht ist

                    const x1 = positions1[i];
                    const y1 = positions1[i + 1];
                    const z1 = positions1[i + 2];
                    const id1 = `${index1}-${i}`; // Eindeutige ID für dieses Partikel

                    // Maximalverbindungen für dieses Partikel prüfen
                    if ((connectionMap.get(id1) || 0) >= maxConnections)
                        continue;

                    // Zufälliges Sampling durch Mischen der Cloud-Index-Paare
                    const randomClouds = [...clouds]
                        .map((cloud, idx) => ({ cloud, idx }))
                        .sort(() => Math.random() - 0.5);

                    for (const { cloud: cloud2, idx: index2 } of randomClouds) {
                        if (totalLines >= maxTotalLines) return; // Beende, wenn Gesamtlimit erreicht ist

                        // Wenn beide Clouds gleich sind, überspringen wir
                        if (index1 === index2 && cloud1 === cloud2) continue;

                        const positions2 = cloud2.geometry.attributes.position
                            .array as Float32Array;

                        for (let j = 0; j < positions2.length; j += 3) {
                            const x2 = positions2[j];
                            const y2 = positions2[j + 1];
                            const z2 = positions2[j + 2];
                            const id2 = `${index2}-${j}`;

                            // Maximale Verbindungen für die Ziele überprüfen
                            if ((connectionMap.get(id2) || 0) >= maxConnections)
                                continue;

                            // Berechne die Distanz
                            const distance = Math.sqrt(
                                (x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2
                            );

                            if (distance < 1 + Math.random() * 1.5) {
                                // Zufällige maximale Distanz
                                const lineGeometry = new THREE.BufferGeometry();
                                const linePositions = new Float32Array([
                                    x1,
                                    y1,
                                    z1,
                                    x2,
                                    y2,
                                    z2,
                                ]);
                                lineGeometry.setAttribute(
                                    'position',
                                    new THREE.BufferAttribute(linePositions, 3)
                                );
                                const line = new THREE.Line(
                                    lineGeometry,
                                    lineMaterial
                                );
                                scene.add(line);
                            }

                            // Verbindung zählen
                            connectionMap.set(
                                id1,
                                (connectionMap.get(id1) || 0) + 1
                            );
                            connectionMap.set(
                                id2,
                                (connectionMap.get(id2) || 0) + 1
                            );

                            totalLines++; // Gesamtanzahl der Linien erhöhen

                            // Beende die Schleifen, wenn maximale Linien erreicht sind
                            if (totalLines >= maxTotalLines) return;
                            break;
                        }
                    }
                }
            });
        };

        // Wolken erstellen und hinzufügen
        const clouds = cloudsConfig.map((config) =>
            createParticleCloud(
                config.color,
                config.size,
                config.particleAmount,
                config.offset
            )
        );
        clouds.forEach((cloud) => scene.add(cloud));

        let lastRenderTime = Date.now();
        const targetFPS = 60;
        const frameInterval = 1000 / targetFPS;

        const dampingFactor = 0.05; // Wie stark die Punkte zur Ausgangsposition zurückgezogen werden

        // Speichere die ursprünglichen Positionen der Partikel
        const originalPositions: Float32Array[] = clouds.map((cloud) =>
            Float32Array.from(
                cloud.geometry.attributes.position.array as Float32Array
            )
        );

        const animate = () => {
            const now = Date.now();
            const deltaTime = now - lastRenderTime;

            if (deltaTime >= frameInterval) {
                lastRenderTime = now;

                // Lösche alte Linien
                scene.children
                    .filter((child) => child.type === 'Line')
                    .forEach((line) => {
                        scene.remove(line);
                        if ((line as THREE.Line).geometry)
                            (line as THREE.Line).geometry.dispose();
                        if ((line as THREE.Line).material)
                            (
                                (line as THREE.Line).material as THREE.Material
                            ).dispose();
                    });

                // Aktualisiere Partikelpositionen in den Wolken
                clouds.forEach((cloud, index) => {
                    const positions = cloud.geometry.attributes.position
                        .array as Float32Array;
                    const original = originalPositions[index];

                    for (let i = 0; i < positions.length; i += 3) {
                        // Dynamische minimale Bewegung
                        const wiggleFactor = 0.002; // Kontrolliert die Stärke der Bewegung
                        const offsetX =
                            Math.sin(now * 0.001 + i * 0.01 + index) *
                            wiggleFactor;
                        const offsetY =
                            Math.cos(now * 0.0012 + i * 0.015 + index) *
                            wiggleFactor;
                        const offsetZ =
                            Math.sin(now * 0.0015 + i * 0.012 + index) *
                            wiggleFactor;

                        // Rückführung zur Ausgangsposition
                        positions[i] +=
                            (original[i] - positions[i]) * dampingFactor +
                            offsetX;
                        positions[i + 1] +=
                            (original[i + 1] - positions[i + 1]) *
                                dampingFactor +
                            offsetY;
                        positions[i + 2] +=
                            (original[i + 2] - positions[i + 2]) *
                                dampingFactor +
                            offsetZ;
                    }

                    cloud.geometry.attributes.position.needsUpdate = true; // Positionen aktualisieren
                });

                // Neue Verbindungslinien basierend auf den aktualisierten Positionen erstellen
                createConnectingLines(clouds, 2, 100);

                // Rotation der Wolken
                const rotationSpeeds = clouds.map(() => Math.random() * 0.002);

                clouds.forEach((cloud, index) => {
                    cloud.rotation.y +=
                        rotationSpeeds[index] * (index % 2 === 0 ? 1 : -1);
                    // cloud.position.x +=
                    //     Math.sin(Date.now() * 0.0015 + index) * 0.003;
                    // cloud.position.y +=
                    //     Math.cos(Date.now() * 0.0018 + index) * 0.003;
                });

                // Szene rendern
                renderer.render(scene, camera);
            }

            requestAnimationFrame(animate);
        };
        animate();

        // Fenstergröße anpassen
        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        const debouncedResize = debounce(onResize, 100);
        window.addEventListener('resize', debouncedResize);

        return () => {
            window.removeEventListener('resize', debouncedResize);
            markerRef.current?.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={markerRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
            }}
        />
    );
};

export default BackgroundAnimation;
