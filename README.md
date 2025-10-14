# @gaddario98/react-native-pages

React Native primitives on top of [`@gaddario98/react-pages`](../react-base-pages/README.md) that let you compose data-driven screens with the same declarative page builder API used on web. This package wires the shared page engine to native-safe layout containers, virtualization powered by FlashList, and helpers tailored for Expo/React Native apps.

## Highlights

- Built-in React Native wrappers for all page containers (safe area, spacing, loader, header, footer)
- Virtualized body layouts via Shopify FlashList with optional masonry and infinite scroll
- Draggable body layout backed by `react-native-draggable-flatlist`
- Ready-made authentication page helper that reuses your shared UI kit
- Re-exports the complete `@gaddario98/react-pages` surface (types, hooks, utilities) for end-to-end parity
- Designed to be configured once through `setReactNativePageConfig` (or `setReactNativeConfig` from `@gaddario98/react-native-core`)

## Installation

```bash
# with npm	npm install @gaddario98/react-native-pages
# or with yarn	yarn add @gaddario98/react-native-pages
```

### Peer dependencies

Make sure the following packages are available in your project (matching the versions declared in `package.json`):

```
react, react-native, react-dom, react-hook-form, @tanstack/react-query,
@shopify/flash-list, react-native-draggable-flatlist, react-native-gesture-handler,
@gaddario98/react-pages, @gaddario98/react-native-ui, @gaddario98/react-form,
@gaddario98/react-queries, @gaddario98/utiles, i18next, react-i18next
```

## Quick start

1. **Configure the React Native containers** – call `setReactNativePageConfig` as early as possible (for example when bootstrapping providers). The helper supplies sensible defaults (safe area wrapper, padding, loader banner), and you can override any part of the shared `pageConfig`.

```tsx
import { setReactNativePageConfig } from '@gaddario98/react-native-pages';

setReactNativePageConfig({
	authPageImage: require('./assets/login.png'),
	HeaderContainer: ({ children }) => children,
	FooterContainer: ({ children }) => children,
	// Provide a custom SafeAreaView / ScrollView if you need it
	BodyContainer: ({ children, ...rest }) => (
		<ShopifyView {...rest} body={children} itemForPage={20} />
	),
});
```

2. **Render a page with the shared generator** – all exports from `@gaddario98/react-pages` are forwarded, so you can use `PageGenerator`, `PageProps`, `usePageConfig`, and the rest exactly as on web.

```tsx
import { PageGenerator, PageProps } from '@gaddario98/react-native-pages';

const Example = () => {
	const props: PageProps = {
		id: 'home',
		ns: 'home',
		contents: [
			{
				type: 'custom',
				component: <Headline text="Welcome" />, // your RN component
			},
		],
	};

	return <PageGenerator {...props} />;
};
```

## Layout building blocks

- `DefaultView` – ScrollView with shared spacing (`pageLayout`, `padding`), safe refresh control when queries are present, and support for pull-to-refresh toggled via `viewSettings.disableRefreshing`.
- `ShopifyView` – FlashList-backed virtualizer that accepts the same `viewSettings` from `@gaddario98/react-pages`. Supports `itemForPage`, `onEndReached`, `numColumns`, and Masonry layout (`type: 'mansoryLayout'`).
- `DraggableView` – DraggableFlatList integration with long-press drag handles. Honors `isInDraggableView` / `isDraggable` flags from content items and forwards reorder events via `onReorder`.

Each layout shares the same props signature as `pageConfig.BodyContainer`, so you can drop them in via `viewSettings.customLayoutComponent` or override the global config.

## Auth page helper

`useAuthPageProps` builds a complete authentication flow using your UI kit components (`Image`, `Paragraph`, `Button`). It merges the global `pageConfig.authPageImage` fallback with the overrides you provide and delivers a ready-to-render `PageProps` object for login/signup/report-problem screens.

```tsx
import { useAuthPageProps } from '@gaddario98/react-native-pages';

const authPage = useAuthPageProps({
	login: { text: 'login', onPress: () => router.push('/login') },
	signup: { text: 'createAccount', variant: 'outlined' },
});

setReactNativePageConfig({ authPageProps: authPage });
```

## Relationship with `@gaddario98/react-pages`

This package re-exports the underlying page engine so mixed React / React Native apps can share the same schema:

- `PageGenerator`, `PageProps`, `ContentItem`, `ViewSettings`, `usePageConfig`, `useGenerateContent`, etc.
- Form helpers (`useFormPage`, `useFormData`, `useGenerateContentRender`) and query utilities.
- Global configuration (`pageConfig`, `setPageConfig`) to customize auth control, meta tags, and container components.

Keep defining pages as data (queries, forms, dynamic content factories) once—then pick the appropriate layout container for the platform.

## How `biblion-expo-version` uses it

- `core/config/index.tsx` calls `setReactNativeConfig` from `@gaddario98/react-native-core`, which forwards the `pages` object to `setReactNativePageConfig`. The app overrides:
	- `authPageImage` and `pageConfig.isLogged` to handle verified accounts.
	- `ItemsContainer` and `PageContainer` to inject custom `View` wrappers.
	- Global auth page copy by composing `useAuthPageProps`.
- `features/page/custom-layout-component/index.tsx` exports `CustomLayoutComponent` and `CustomDraggableLayout` that wrap `ShopifyView` and `DraggableView`, allowing screens to switch between virtualized grids and drag-and-drop layouts through `viewSettings.customLayoutComponent`.
- `core/pages/PageGeneratorWithHeader.tsx` composes additional header content before delegating to the shared `PageGenerator`, illustrating how content arrays can be extended while preserving indices and drag settings.
- Individual feature pages (for example `features/page/shared/post.tsx`) continue to describe their content, queries, and mutations with the shared DSL; the React Native layouts handle rendering and interactions.

This setup lets the Expo app reuse business logic from `@gaddario98/react-pages` while adopting native-safe UI wrappers.

## API surface

| Export | Description |
| --- | --- |
| `setReactNativePageConfig(config: Partial<PageConfigProps>)` | Merge React Native-ready defaults into the shared `pageConfig`. |
| `DefaultView`, `ShopifyView`, `DraggableView` | Drop-in replacements for `pageConfig.BodyContainer` tuned for RN. |
| `useAuthPageProps(props: UseAuthPageProps)` | Generates translated auth page content. |
| `*` (from `@gaddario98/react-pages`) | Re-export of every component, hook, type, and utility from the base package. |

## Building the package

```bash
yarn build
```

This runs the Rollup bundle defined in `rollup.config.js` and emits ESM + type definitions to `dist/`.

## License

MIT © Giosuè Addario
