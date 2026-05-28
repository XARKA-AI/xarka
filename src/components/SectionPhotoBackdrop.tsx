type SectionPhotoBackdropProps = {
  src: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
};

const SectionPhotoBackdrop = ({
  src,
  loading = "lazy",
  fetchPriority = "low",
}: SectionPhotoBackdropProps) => (
  <>
    <img
      src={src}
      alt=""
      className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
      loading={loading}
      decoding="async"
      fetchpriority={fetchPriority}
      aria-hidden="true"
    />
    <div className="pointer-events-none absolute inset-0 bg-white/40 dark:bg-background/25" />
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-white/20 dark:from-background/80 dark:via-background/35 dark:to-transparent" />
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/95 via-white/30 to-transparent dark:from-background/85 dark:via-transparent dark:to-transparent" />
  </>
);

export default SectionPhotoBackdrop;
