interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
}

const GameBanner = ({ bannerUrl, title, adsCount }: GameBannerProps) => {
  return (
    <a
      href=""
      className="relative rounded-lg overflow-hidden w-[204px]"
      onClick={(e) => e.preventDefault()}
    >
      <img src={bannerUrl} className="w-full h-full rounded-[0.625rem]" />

      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 rounded-lg">
        <strong className="font-bold text-white block text-ellipsis whitespace-nowrap overflow-hidden">
          {title}
        </strong>
        <span className="text-zinc-300 text-sm block text-ellipsis whitespace-nowrap overflow-hidden">
          {adsCount} anúncios
        </span>
      </div>
    </a>
  );
};

export default GameBanner;
