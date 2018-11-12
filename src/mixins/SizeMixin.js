export default {
	props: {
		size: {
			type: String,
			required: false,
			default: () => '',
			validator(kind) {
			  return [
				'',
				'big',
				'bigger',
			  ].includes(kind);
			},
		  },
	},
}