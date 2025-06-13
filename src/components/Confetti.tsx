import { useEffect, useState } from "react";
import STATUS from "../constants/status";

type ConfettiProps = { type: string };

const Confetti = ({ type }: ConfettiProps) => {
    const [particles, setParticles] = useState<Array<{
        id: number;
        x: number;
        y: number;
        vx: number;
        vy: number;
        color: string;
        rotation: number;
        rotationSpeed: number;
    }>>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: -10,
            vx: (Math.random() - 0.5) * 2,
            vy: Math.random() * 3 + 2,
            color: type === STATUS.ACHIEVEMENT ? '#d4c0fd' : '#e2e3ff',
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10
        }));
        setParticles(newParticles);

        const interval = setInterval(() => {
            setParticles(prev =>
                prev.map(particle => ({
                    ...particle,
                    x: particle.x + particle.vx,
                    y: particle.y + particle.vy,
                    rotation: particle.rotation + particle.rotationSpeed,
                    vy: particle.vy + 0.1
                })).filter(particle => particle.y < 200)
            );
        }, 16);

        const timeout = setTimeout(() => {
            setParticles([]);
            clearInterval(interval);
        }, 6000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {particles.map(particle => (
                <div
                    key={particle.id}
                    className="fixed w-2 h-2 rounded-sm"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        backgroundColor: particle.color,
                        transform: `rotate(${particle.rotation}deg)`,
                        transition: 'none'
                    }}
                />
            ))}
        </div>
    );
};

export default Confetti;