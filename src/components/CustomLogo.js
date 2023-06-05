import PropTypes from 'prop-types';
import Image from './Image';
import user_img from './../utils/helper';

// ----------------------------------------------------------------------

CustomLogo.propTypes = {
  src: PropTypes.string,
  sx: PropTypes.object,
};

export default function CustomLogo({ url, sx, ratio }) {
  return <Image sx={sx} visibleByDefault disabledEffect src={url} alt="login" />;
}
