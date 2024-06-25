# Usage

## NPM

```
npm install --save @dreamsengine/dreams-ad-engine
```

### Script

Add the script of gpt in the template head of html

```
<html>
	<head>
	...
	<script async id="gads-js" src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" defer></script>
	...
	</head>
	...
</html>
```

## Component

```
<dreams-ad-engine
	networkId="xxx"
	adUnit="xxx-xx-x-xx"
	mapping='[{"viewport":[320,0],"sizing":[[320,50],[320,100]]},{"viewport":[720,0],"sizing":[[728,90]]},{"viewport":[970,0],"sizing":[[920,250],[970,90],[728,90]]},{"viewport":[1280,0],"sizing":[[920,250],[970,250],[970,90],[728,90]]}]'
	sizing="[[320,50],[320,100],[728,90],[970,90],[920,250],[970,250]]"
	refresh
	enableTitle
	title="Anuncio"
	minHeight="250"
></dreams-ad-engine>
```

### Options

| Option      | Type    | Required | Default    |
| ----------- | ------- | -------- | ---------- |
| networkId   | String  | Yes      | -          |
| adUnit      | String  | Yes      | -          |
| mapping     | Array   | Yes      | -          |
| sizing      | Array   | Yes      | -          |
| refresh     | Boolean | No       | false      |
| enableTitle | Boolean | No       | false      |
| title       | String  | No       | Publicidad |
| minHeight   | Number  | No       | 100        |

-   refresh: If you use this param the ad will be available to refresh it
-   enableTitle: If you use this param one title appears above of the ad
-   title: If you use this param overwrite "Publicidad"
-   minHeight: If you use this param the height will be established on the container of ad

## Examples

Use the library in

### Nextjs 14.2.1 or higher

```
'use client'
import "@dreamsengine/dreams-ad-engine/dist/dreams-ad-engine"

const AdTestComponent = () => {
	return(
		<dreams-ad-engine
			networkId="xxx"
			adUnit="xxx-xx-x-xx"
			mapping='[{"viewport":[320,0],"sizing":[[320,50],[320,100]]},{"viewport":[720,0],"sizing":[[728,90]]},{"viewport":[970,0],"sizing":[[920,250],[970,90],[728,90]]},{"viewport":[1280,0],"sizing":[[920,250],[970,250],[970,90],[728,90]]}]'
			sizing="[[320,50],[320,100],[728,90],[970,90],[920,250],[970,250]]"
		></dreams-ad-engine>
	);
};

export default AdTestComponent;
```

Use the component disabling SSR

```
import dynamic from "next/dynamic";

const AdComponentDynamic = dynamic(() => import("./Home/AdComponentHome"), {
	ssr: false,
});

const Home = () => {
	return (
		<main>
			<AdComponentDynamic />
		</main>
	);
};

export default Home;
```

If you use Typescript in the folder src create the file "custom-elements.d.ts" and add the this code.

```
declare namespace JSX {
	interface IntrinsicElements {
		"dreams-ad-engine": unknown;
	}
}
```

### React

```
import "@dreamsengine/dreams-ad-engine/dist/dreams-ad-engine";

function App() {
	return (
		<>
			<dreams-ad-engine
				networkId="xxxxx"
				adUnit="xxx-xx-x-xx"
				mapping='[{"viewport":[320,0],"sizing":[[320,50],[320,100]]},{"viewport":[720,0],"sizing":[[728,90]]},{"viewport":[970,0],"sizing":[[920,250],[970,90],[728,90]]},{"viewport":[1280,0],"sizing":[[920,250],[970,250],[970,90],[728,90]]}]'
				sizing="[[320,50],[320,100],[728,90],[970,90],[920,250],[970,250]]"
			></dreams-ad-engine>
		</>
	);
}

export default App;
```

If you use Typescript in the folder src create the file "custom-elements.d.ts" and add the this code.

```
declare namespace JSX {
	interface IntrinsicElements {
		"dreams-ad-engine": unknown;
	}
}
```

### Qwik

```
import { component$ } from "@builder.io/qwik";

export default component$(() => {
	return (
		<>
			<dreams-ad-engine
				networkId="xxxxxxxx"
				adUnit="xxx-xx-x-xx"
				mapping='[{"viewport":[320,0],"sizing":[[320,50],[320,100]]},{"viewport":[720,0],"sizing":[[728,90]]},{"viewport":[970,0],"sizing":[[920,250],[970,90],[728,90]]},{"viewport":[1280,0],"sizing":[[920,250],[970,250],[970,90],[728,90]]}]'
				sizing="[[320,50],[320,100],[728,90],[970,90],[920,250],[970,250]]"
			></dreams-ad-engine>
		</>
	);
});
```

In the fille root add this code

```
import { $, component$, useOnDocument } from "@builder.io/qwik";
...
export default component$(() => {
	...
	useOnDocument(
		"DOMContentLoaded",
		$(() => {
			(async () => {
				await import(
					"@dreamsengine/dreams-ad-engine/dist/dreams-ad-engine"
				);
			})();
		})
	);
	...
});
```

If you use Typescript in the folder src create the file "dreams-ad-engine.d.ts" and add the this code.

```
declare module "@dreamsengine/dreams-ad-engine/dist/dreams-ad-engine" {
	const AdComponent: any; // Adjust the type if you know the actual type
	export default AdComponent;
}
```
