import { configure } from '@storybook/vue';
import { setOptions } from '@storybook/addon-options';
import Vue from 'vue';

function loadStories() {
	require('../stories');
}

setOptions({
	name: 'Samora UI',
	url: 'https://unbabel.gitlab.io/ui/',
});

configure(loadStories, module);
