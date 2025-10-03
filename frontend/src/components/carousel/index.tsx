"use client";

import "react-medium-image-zoom/dist/styles.css";
import ArrowLeftIcon from "@heroicons/react/24/outline/ArrowLeftIcon";
import ArrowRightIcon from "@heroicons/react/24/outline/ArrowRightIcon";
import { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { DialogComponent, DialogContentComponent } from "@/components/dialog";
import { ImagePlaceholderComponent } from "@/components/images/image-placeholder";
import { Image as ImageType } from "@/lib/types";

export interface CarouselProps {
  items: { type: "image"; image: ImageType | null }[];
}

export const CarouselComponent: React.FC<CarouselProps> = ({
  items,
}: CarouselProps) => {
  /**************************/
  /********** STATE *********/
  /**************************/

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [canLoop, setCanLoop] = useState(true);

  const [zoomedImage, setZoomedImage] = useState<ImageType | null>(null);

  const [zoom, setZoom] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: "y",
    loop: true,
    containScroll: false,
  });

  /******************************/
  /********** CALLBACKS *********/
  /******************************/

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setCanLoop(emblaApi.internalEngine().slideLooper.canLoop());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  const onNextClick = useCallback(() => {
    if (!emblaApi) return;

    emblaApi.scrollNext();
  }, [emblaApi]);

  const onPrevClick = useCallback(() => {
    if (!emblaApi) return;

    emblaApi.scrollPrev();
  }, [emblaApi]);

  const handleImageClick = useCallback((image: ImageType) => {
    setZoom(true);
    setZoomedImage(image);
  }, []);

  const handleZoomClose = useCallback(() => setZoom(false), []);

  /****************************/
  /********** EFFECTS *********/
  /****************************/

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);

    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect, onInit]);

  return (
    <>
      <div className="h-full">
        <div className="h-[calc(100%-7rem)] overflow-hidden" ref={emblaRef}>
          <div
            className={`
              flex h-full touch-pan-x flex-col

              ${!canLoop && `border-t border-t-border`}
            `}
          >
            {items.map(({ image }, index) => (
              <div className="border-b border-b-border" key={index}>
                {index === selectedIndex ? (
                  <div className="flex items-center justify-center p-2">
                    {image ? (
                      <Image
                        alt={image.alt}
                        {...image.medium}
                        {...(image.placeholder
                          ? {
                              placeholder: "blur",
                              blurDataURL: image.placeholder,
                            }
                          : {})}
                        className="cursor-zoom-in"
                        onClick={() => handleImageClick(image)}
                      />
                    ) : (
                      <ImagePlaceholderComponent />
                    )}
                  </div>
                ) : (
                  <div
                    className={`
                      flex items-center justify-center p-2 opacity-50 grayscale
                    `}
                  >
                    {image ? (
                      <Image
                        alt={image.alt}
                        {...image.medium}
                        {...(image.placeholder
                          ? {
                              placeholder: "blur",
                              blurDataURL: image.placeholder,
                            }
                          : {})}
                      />
                    ) : (
                      <ImagePlaceholderComponent />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex h-[7rem] flex-row border-t border-t-border">
          <div
            className={`
              flex h-full basis-1/2 cursor-pointer select-none items-center
              justify-center bg-background

              active:bg-foreground/20

              hover:bg-foreground/10
            `}
            onClick={onPrevClick}
          >
            <ArrowLeftIcon className="h-7 w-7" />
          </div>
          <div
            className={`
              flex h-full basis-1/2 cursor-pointer select-none items-center
              justify-center border-l border-l-border bg-foreground

              active:brightness-150

              hover:brightness-125
            `}
            onClick={onNextClick}
          >
            <ArrowRightIcon className="h-7 w-7 text-white" />
          </div>
        </div>
      </div>
      <DialogComponent open={zoom} onOpenChange={handleZoomClose}>
        <DialogContentComponent
          onClick={handleZoomClose}
          className={`
            flex cursor-zoom-out items-center justify-center overflow-hidden
          `}
        >
          {zoomedImage && (
            <Image
              style={{ objectFit: "contain" }}
              className="flex max-h-[calc(100dvh-4rem)] max-w-[calc(100vw-4rem)]"
              alt={zoomedImage.alt}
              {...(zoomedImage.placeholder
                ? {
                    placeholder: "blur",
                    blurDataURL: zoomedImage.placeholder,
                  }
                : {})}
              {...zoomedImage.original}
            />
          )}
        </DialogContentComponent>
      </DialogComponent>
    </>
  );
};
