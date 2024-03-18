import autoprefixer from 'autoprefixer';

export default {
	plugins: {
		// browserslist is set in package.json
		// don't add "not dead" to it or autoprefixer
		// doesn't add a bunch of prefixes I know for sure
		// are needed on safari iOS
		autoprefixer: autoprefixer({})
	}
};
