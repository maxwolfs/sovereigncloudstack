import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const clouds = [
    { color: 0x0f5fe1, size: 0.03, particleAmount: 400 },
    { color: 0x50c3a5, size: 0.02, particleAmount: 1000 },
];

const debounce = <F extends (...args: any[]) => any>(
    func: F,
    delay: number
): ((...args: Parameters<F>) => void) => {
    let inDebounce: NodeJS.Timeout | undefined;

    return (...args: Parameters<F>) => {
        if (inDebounce !== undefined) {
            clearTimeout(inDebounce);
        }
        inDebounce = setTimeout(() => func(...args), delay);
    };
};

const BackgroundAnimation: React.FC = () => {
    const markerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!markerRef.current) return;

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

        camera.position.z = 5;

        // Function to create a particle cloud
        const createParticleCloud = (
            color: number,
            size: number,
            particleAmount: number
        ) => {
            const particles = particleAmount;
            const geometry = new THREE.BufferGeometry();
            const material = new THREE.PointsMaterial({
                color: color,
                size: size,
            });

            const positions = [];
            for (let i = 0; i < particles; i++) {
                positions.push((Math.random() - 0.5) * 5); // x
                positions.push((Math.random() - 0.5) * 5); // y
                positions.push((Math.random() - 0.5) * 5); // z
            }
            geometry.setAttribute(
                'position',
                new THREE.Float32BufferAttribute(positions, 3)
            );

            return new THREE.Points(geometry, material);
        };

        // Create and add 5 particle clouds to the scene
        // for (let i = 0; i < 5; i++) {
        //     const cloud = createParticleCloud(0xf33fff6, 0.05);
        //     scene.add(cloud);
        // }

        clouds.map((cloud) => {
            const pc = createParticleCloud(
                cloud.color,
                cloud.size,
                cloud.particleAmount
            );
            scene.add(pc);
        });

        const animate = () => {
            scene.rotation.y += 0.001; // Rotate the scene around the Y-axis
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        animate();

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
            renderer.dispose(); // Dispose of the renderer and its resources
        };
    }, []);

    // In BackgroundAnimation.tsx
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
