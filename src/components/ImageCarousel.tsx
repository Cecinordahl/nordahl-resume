import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

export function ImageCarousel({ projectName, images }: { projectName: string; images: string[] }) {
    const trackRef = useRef<HTMLDivElement>(null);
    const zoomRef = useRef<HTMLDivElement>(null);
    const dragState = useRef<{ pointerId: number; x: number; y: number; scrollLeft: number; scrollTop: number } | null>(null);
    const wasDraggedRef = useRef(false);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [zoomed, setZoomed] = useState(false);

    function scrollByOne(direction: -1 | 1) {
        const track = trackRef.current;
        if (!track) return;
        const item = track.querySelector<HTMLElement>(".image-carousel-item");
        const step = item ? item.getBoundingClientRect().width + 10 : track.clientWidth;
        track.scrollBy({ left: direction * step, behavior: "smooth" });
    }

    function goTo(direction: -1 | 1) {
        setZoomed(false);
        setLightboxIndex((i) => (i === null ? i : (i + direction + images.length) % images.length));
    }

    function closeLightbox() {
        setZoomed(false);
        setLightboxIndex(null);
    }

    useEffect(() => {
        if (lightboxIndex === null) return;

        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") closeLightbox();
            else if (e.key === "ArrowLeft") goTo(-1);
            else if (e.key === "ArrowRight") goTo(1);
        }

        document.addEventListener("keydown", onKeyDown);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = prevOverflow;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lightboxIndex, images.length]);

    useEffect(() => {
        if (!zoomed || !zoomRef.current) return;
        const el = zoomRef.current;
        el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
        el.scrollTop = (el.scrollHeight - el.clientHeight) / 2;
    }, [zoomed]);

    function onDragStart(e: React.PointerEvent<HTMLDivElement>) {
        if (!zoomed || !zoomRef.current) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        wasDraggedRef.current = false;
        dragState.current = {
            pointerId: e.pointerId,
            x: e.clientX,
            y: e.clientY,
            scrollLeft: zoomRef.current.scrollLeft,
            scrollTop: zoomRef.current.scrollTop,
        };
    }

    function onDragMove(e: React.PointerEvent<HTMLDivElement>) {
        if (!dragState.current || dragState.current.pointerId !== e.pointerId || !zoomRef.current) return;
        const dx = e.clientX - dragState.current.x;
        const dy = e.clientY - dragState.current.y;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) wasDraggedRef.current = true;
        zoomRef.current.scrollLeft = dragState.current.scrollLeft - dx;
        zoomRef.current.scrollTop = dragState.current.scrollTop - dy;
    }

    function endDrag() {
        dragState.current = null;
    }

    function onImageClick() {
        if (wasDraggedRef.current) {
            wasDraggedRef.current = false;
            return;
        }
        setZoomed((z) => !z);
    }

    if (images.length === 0) return null;

    return (
        <div className="image-carousel">
            <div className="image-carousel-track" ref={trackRef}>
                {images.map((src, i) => (
                    <img
                        key={src}
                        className="image-carousel-item"
                        src={src}
                        alt={`${projectName} ${i + 1}`}
                        loading="lazy"
                        role="button"
                        tabIndex={0}
                        onClick={() => setLightboxIndex(i)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setLightboxIndex(i);
                            }
                        }}
                    />
                ))}
            </div>
            {images.length > 1 && (
                <>
                    <button
                        type="button"
                        className="image-carousel-nav image-carousel-nav-prev"
                        onClick={() => scrollByOne(-1)}
                        aria-label={`Previous ${projectName} image`}
                    >
                        <ChevronLeftIcon />
                    </button>
                    <button
                        type="button"
                        className="image-carousel-nav image-carousel-nav-next"
                        onClick={() => scrollByOne(1)}
                        aria-label={`Next ${projectName} image`}
                    >
                        <ChevronRightIcon />
                    </button>
                </>
            )}

            {lightboxIndex !== null && createPortal(
                <div className="lightbox-backdrop" onClick={closeLightbox}>
                    <button
                        type="button"
                        className="lightbox-close"
                        onClick={closeLightbox}
                        aria-label="Close"
                    >
                        &times;
                    </button>

                    {images.length > 1 && (
                        <button
                            type="button"
                            className="lightbox-nav lightbox-nav-prev"
                            onClick={(e) => {
                                e.stopPropagation();
                                goTo(-1);
                            }}
                            aria-label={`Previous ${projectName} image`}
                        >
                            <ChevronLeftIcon />
                        </button>
                    )}

                    <div
                        className={`lightbox-viewport${zoomed ? " lightbox-viewport-zoomed" : ""}`}
                        ref={zoomRef}
                        onClick={(e) => e.stopPropagation()}
                        onPointerDown={onDragStart}
                        onPointerMove={onDragMove}
                        onPointerUp={endDrag}
                        onPointerCancel={endDrag}
                    >
                        <img
                            className={`lightbox-image${zoomed ? " lightbox-image-zoomed" : ""}`}
                            src={images[lightboxIndex]}
                            alt={`${projectName} ${lightboxIndex + 1}`}
                            draggable={false}
                            onDragStart={(e) => e.preventDefault()}
                            onClick={onImageClick}
                        />
                    </div>

                    {images.length > 1 && (
                        <button
                            type="button"
                            className="lightbox-nav lightbox-nav-next"
                            onClick={(e) => {
                                e.stopPropagation();
                                goTo(1);
                            }}
                            aria-label={`Next ${projectName} image`}
                        >
                            <ChevronRightIcon />
                        </button>
                    )}
                </div>,
                document.body,
            )}
        </div>
    );
}
