import { useEffect, useState } from 'react';

export const Main: React.FC = () => {
	const [top, setTop] = useState<number>(0);

	useEffect(() => {
		const listener = () => {
			setTop((document.scrollingElement as HTMLElement).scrollTop);
		};
		window.addEventListener('scroll', listener);
		return () => window.removeEventListener('scroll', listener);
	}, [top, setTop]);

	return (
		<div className="fixed inset-0 w-full h-full text-white scroll-smooth bg-white">
			<StorySection distFromTop={top} src="/images/house.png" pos={0 * 700} translate={{ startLeft: -500, endLeft: -200, startTop: 0, endTop: -200 }} />
			<StorySection distFromTop={top} src="/images/house.png" pos={1 * 700} translate={{ startLeft: -200, endLeft: -200, startTop: -200, endTop: 0 }} />
			<StorySection distFromTop={top} src="/images/house.png" pos={2 * 700} translate={{ startLeft: -200, endLeft: 50, startTop: 0, endTop: 0 }} />
			<StorySection distFromTop={top} src="/images/house.png" pos={3 * 700} translate={{ startLeft: 50, endLeft: 50, startTop: 0, endTop: 0 }} />
			<StorySection distFromTop={top} src="/images/house.png" pos={4 * 700} translate={{ startLeft: 50, endLeft: 50, startTop: 0, endTop: 0 }} />
			<StorySection distFromTop={top} src="/vite.svg" pos={5.5 * 700} translate={{ startLeft: 50, endLeft: 50, startTop: 0, endTop: 0 }} />
		</div>
	);
};

function useImagePreloader(src: string) {
	useEffect(() => {
		const img = new Image();
		img.src = src;
		img.onload = console.log;
		return () => {
			img.onload = null;
		};
	}, [src]);
	return src;
}

const StorySection: React.FC<{ distFromTop: number; src: string; pos: number; translate: { startLeft: number; endLeft: number; startTop: number; endTop: number } }> = ({ distFromTop, src, pos, translate }) => {
	let imgSrc = useImagePreloader(src);
	const scale = Math.max(Math.pow(2, (distFromTop - pos) / 150), 0);
	const transform = `scale(${scale < 0.05 ? 0 : scale})`;
	const opacity = scale > 18 ? 0 : scale < 1 ? 1 : 1 / Math.sqrt(scale);
	const left = `${Math.max(scale, 1) * (translate.startLeft - translate.endLeft) + translate.endLeft}px`;
	const top = `${Math.max(scale, 1) * (translate.startTop - translate.endTop) + translate.endTop}px`;
	console.log(transform);

	return (
		<div className="w-full h-full absolute inset-0 overflow-hidden">
			<>
				<img src={imgSrc} className="absolute inset-0 object-contain h-full w-full" style={{ opacity, transform, left, top }} />
			</>
		</div>
	);
};
