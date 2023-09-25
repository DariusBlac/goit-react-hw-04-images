import { Hourglass } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Hourglass
      visible={true}
      height="80"
      width="80"
      ariaLabel="hourglass-loading"
      wrapperStyle={{
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '10px',
      }}
      wrapperClass="wrapper"
      colors={['#306cce', '#72a1ed']}
    />
  );
};
