import { Composition } from 'remotion';
import { Title } from './Title';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Title"
      component={Title}
      durationInFrames={150}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
