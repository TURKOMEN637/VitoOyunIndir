import mcentersCover from "@/assets/mcenters-cover.jpg";
import vitoMp3Mp4Cover from "@/assets/vito-mp3-mp4-cover.jpg";

export interface AppItem {
  id: string;
  title: string;
  description: string;
  image: string;
  downloadUrl: string;
}

export const apps: AppItem[] = [
  {
    id: "mcenters",
    title: "Mcenters Full İndir",
    description: "Minecraft Bedrock Edition için Mcenters uygulamasını indirin. Modlar, haritalar ve daha fazlası.",
    image: mcentersCover,
    downloadUrl: "https://github.com/TURKOMEN637/minecraft-bedrock-mcenters-setup-vito-oyun-indir/releases/tag/Mcenters8",
  },
  {
    id: "vito-mp3-mp4-downloader",
    title: "Vito Mp3 Mp4 Downloader Full İndir",
    description: "Kendi yazdığım bu uygulamayla İnstagram, Tiktok ve Youtube platformlarında 4K'ya kadar ücretsiz, reklamsız, sınırsız ve hızlı bir şekilde video veya şarkı/müzik indirebilirsiniz.",
    image: vitoMp3Mp4Cover,
    downloadUrl: "https://github.com/TURKOMEN637/vitomp3mp4downloader/releases/tag/vitoyoutubedownloader",
  },
];
