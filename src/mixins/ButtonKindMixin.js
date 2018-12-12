export default {
	props: {
		kind: {
			type: String,
			required: false,
			default() {
				return '';
			},
			validator(kind) {
				return [
					'',
					'primary',
					'cta',
					'ctaAlt',
				].includes(kind);
			},
		},
	},
};
