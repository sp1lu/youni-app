/** Dependencies */
import { useEffect, useRef } from 'react'
import QRCode from 'qrcode'

/** Types */
interface QRCodeCanvasProps {
    url: string
}

/** Component */
function QRCodeCanvas(props: QRCodeCanvasProps) {
    const { url } = props;

    /** Refs */
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    /** Effects */
    useEffect(() => {
        if (!canvasRef.current) return;

        QRCode.toCanvas(canvasRef.current, url, {
            width: 200,
            errorCorrectionLevel: 'H'
        })
    }, [url]);

    /** Node */
    return (
        <canvas ref={canvasRef}></canvas>
    )
}

export default QRCodeCanvas