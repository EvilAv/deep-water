import { useEffect } from "react"

export const useCanvas = (ref: React.RefObject<HTMLCanvasElement>) => {
    useEffect(() => {
        if (ref.current){
            const ctx = ref.current.getContext('2d');
            if (ctx){
                ctx.fillRect(0, 0, 50, 50);
            }
        }
    }, [ref]);
}