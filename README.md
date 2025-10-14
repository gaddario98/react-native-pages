# @gaddario98/react-native-pages

[![npm version](https://badge.fury.io/js/@gaddario98%2Freact-native-pages.svg)](https://badge.fury.io/js/@gaddario98%2Freact-native-pages)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful React Native library for dynamic page generation with form management, query handling, and flexible layouts. Built on top of `@gaddario98/react-pages`, this library provides React Native-specific implementations for building complex, data-driven mobile applications.

## Features

✨ **Dynamic Page Generation** - Create pages dynamically based on configuration objects  
📱 **React Native Optimized** - Native components and gestures for optimal mobile experience  
🔄 **Drag & Drop Support** - Built-in draggable list functionality with `react-native-draggable-flatlist`  
🎨 **Flexible Layouts** - Multiple view types including default scroll views and Shopify-style layouts  
🔍 **Query Integration** - Seamless integration with `@tanstack/react-query` for data fetching  
📝 **Form Management** - Advanced form handling with `react-hook-form` integration  
🌐 **i18n Support** - Full internationalization support with `react-i18next`  
🎯 **Type Safety** - Built with TypeScript for better development experience  
🔐 **Authentication Ready** - Built-in authentication page templates and controls

## Installation

```bash
npm install @gaddario98/react-native-pages
```

### Peer Dependencies

Make sure to install the required peer dependencies:

```bash
npm install @gaddario98/react-form @gaddario98/react-native-ui @gaddario98/react-pages @gaddario98/react-queries @gaddario98/utiles react react-dom react-native @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities @shopify/flash-list @tanstack/react-query @tanstack/react-virtual i18next react-hook-form react-i18next react-native-draggable-flatlist react-native-gesture-handler
```

## Quick Start

### 1. Configure the Library

First, configure the React Native page settings in your app's entry point:

```tsx
import { setReactNativePageConfig } from '@gaddario98/react-native-pages';

// Configure the library with your preferred settings
setReactNativePageConfig({
  // Custom configuration options
  authPageImage: require('./assets/logo.png'),
  // Add other configuration as needed
});
```

### 2. Create Your First Page

```tsx
import React from 'react';
import { PageGenerator } from '@gaddario98/react-native-pages';

const MyPage = () => {
  return (
    <PageGenerator
      id="my-page"
      ns="common" // Translation namespace
      contents={[
        {
          type: 'text',
          config: {
            text: 'Welcome to my app!',
            style: { fontSize: 24, fontWeight: 'bold' }
          }
        },
        {
          type: 'button',
          config: {
            title: 'Get Started',
            onPress: () => console.log('Button pressed!')
          }
        }
      ]}
    />
  );
};

export default MyPage;
```

## Core Components

### PageGenerator

The main component for generating dynamic pages.

```tsx
import { PageGenerator } from '@gaddario98/react-native-pages';

<PageGenerator
  id="unique-page-id"
  ns="translation-namespace"
  contents={[...]} // Page content configuration
  queries={[...]}  // Data queries configuration
  form={{...}}     // Form configuration
  viewSettings={{...}} // Layout and behavior settings
  meta={{...}}     // Page metadata
/>
```

### Layout Components

#### DefaultView

A scrollable view with pull-to-refresh functionality:

```tsx
import { DefaultView } from '@gaddario98/react-native-pages';

<DefaultView
  viewSettings={{ disableRefreshing: false }}
  handleRefresh={async () => {
    // Handle refresh logic
  }}
  hasQueries={true}
>
  {/* Your content */}
</DefaultView>
```

#### DraggableView

A draggable list view for reorderable content:

```tsx
import { DraggableView } from '@gaddario98/react-native-pages';

<DraggableView
  body={items}
  onReorder={(data) => {
    // Handle item reordering
    console.log('New order:', data);
  }}
  numColumns={1}
  itemForPage={10}
/>
```

#### ShopifyView

Optimized view using Shopify's FlashList for performance:

```tsx
import { ShopifyView } from '@gaddario98/react-native-pages';

<ShopifyView
  data={largeDataSet}
  renderItem={({ item }) => <YourItemComponent item={item} />}
  estimatedItemSize={50}
/>
```

## Advanced Usage

### Form Integration

Create forms with validation and submission handling:

```tsx
import { PageGenerator } from '@gaddario98/react-native-pages';
import { useForm } from 'react-hook-form';

const FormPage = () => {
  return (
    <PageGenerator
      id="form-page"
      ns="forms"
      form={{
        defaultValues: {
          name: '',
          email: '',
        },
        validation: {
          name: { required: 'Name is required' },
          email: { 
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email format'
            }
          }
        }
      }}
      contents={[
        {
          type: 'input',
          name: 'name',
          config: {
            placeholder: 'Enter your name',
            label: 'Name'
          }
        },
        {
          type: 'input',
          name: 'email',
          config: {
            placeholder: 'Enter your email',
            label: 'Email',
            keyboardType: 'email-address'
          }
        },
        {
          type: 'submit',
          config: {
            title: 'Submit',
            onSubmit: (data) => {
              console.log('Form submitted:', data);
            }
          }
        }
      ]}
    />
  );
};
```

### Query Integration

Integrate with data fetching using React Query:

```tsx
import { PageGenerator } from '@gaddario98/react-native-pages';

const DataPage = () => {
  return (
    <PageGenerator
      id="data-page"
      ns="data"
      queries={[
        {
          queryKey: ['users'],
          queryFn: () => fetch('/api/users').then(res => res.json()),
          enabled: true
        }
      ]}
      contents={[
        {
          type: 'list',
          config: {
            dataSource: 'users', // References the query above
            renderItem: ({ item }) => (
              <UserCard user={item} />
            )
          }
        }
      ]}
    />
  );
};
```

### Authentication Pages

Use the built-in authentication page generator:

```tsx
import { useAuthPageProps } from '@gaddario98/react-native-pages';

const AuthPage = () => {
  const authProps = useAuthPageProps({
    image: {
      source: require('./assets/logo.png'),
      style: { width: 200, height: 200 }
    },
    login: {
      title: 'Sign In',
      onPress: () => {
        // Handle login
      }
    },
    signup: {
      title: 'Create Account',
      onPress: () => {
        // Handle signup
      }
    }
  });

  return <PageGenerator {...authProps} />;
};
```

## Configuration Options

### setReactNativePageConfig

Configure global settings for the library:

```tsx
import { setReactNativePageConfig } from '@gaddario98/react-native-pages';

setReactNativePageConfig({
  // Custom page container
  PageContainer: ({ children, id }) => (
    <SafeAreaView style={{ flex: 1 }} id={id}>
      {children}
    </SafeAreaView>
  ),
  
  // Custom header container
  HeaderContainer: ({ children, withoutPadding }) => (
    <View style={{ 
      paddingHorizontal: withoutPadding ? 0 : 16,
      paddingTop: withoutPadding ? 0 : 16 
    }}>
      {children}
    </View>
  ),
  
  // Custom footer container
  FooterContainer: ({ children, withoutPadding }) => (
    <View style={{ 
      paddingHorizontal: withoutPadding ? 0 : 16,
      paddingBottom: withoutPadding ? 0 : 16 
    }}>
      {children}
    </View>
  ),
  
  // Custom body container
  BodyContainer: ({ children }) => (
    <DefaultView>{children}</DefaultView>
  ),
  
  // Custom loader component
  LoaderComponent: ({ loading, message, ns }) => (
    loading ? <ActivityIndicator size="large" /> : null
  ),
  
  // Authentication page image
  authPageImage: require('./assets/auth-bg.png'),
  
  // Check if user is logged in
  isLogged: (user) => !!user?.id,
});
```

## Layout Types

### ViewSettings Configuration

Control the layout and behavior of your pages:

```tsx
const viewSettings = {
  // Disable pull-to-refresh
  disableRefreshing: false,
  
  // Layout type
  layoutType: 'default' | 'draggable' | 'shopify',
  
  // For draggable views
  numColumns: 1,
  onReorder: (data) => console.log('Reordered:', data),
  
  // For paginated content
  itemForPage: 20,
  onEndReached: () => {
    // Load more items
  },
  
  // Custom styles
  containerStyle: {
    backgroundColor: '#f5f5f5'
  }
};
```

## API Reference

### Types

#### PageProps
```tsx
interface PageProps<F extends FieldValues, Q extends QueriesArray> {
  id: string;
  ns?: string;
  contents?: ContentItem<F, Q>[];
  queries?: QueryConfigArray<Q>;
  form?: FormManagerConfig<F>;
  viewSettings?: ViewSettings;
  meta?: PageMetadataProps;
  enableAuthControl?: boolean;
  onValuesChange?: (values: F) => void;
}
```

#### ViewSettings
```tsx
interface ViewSettings {
  disableRefreshing?: boolean;
  layoutType?: 'default' | 'draggable' | 'shopify';
  numColumns?: number;
  onReorder?: (data: any[]) => void;
  itemForPage?: number;
  onEndReached?: () => void;
  containerStyle?: ViewStyle;
  header?: {
    withoutPadding?: boolean;
  };
  footer?: {
    withoutPadding?: boolean;
  };
}
```

#### ContentItem
```tsx
interface ContentItem<F extends FieldValues, Q extends QueriesArray> {
  type: 'text' | 'input' | 'button' | 'list' | 'custom' | 'submit';
  name?: string; // For form fields
  config?: any; // Component-specific configuration
  hidden?: boolean;
  conditional?: (data: F, queries: Q) => boolean;
}
```

## Examples

### Complete Example: User Profile Page

```tsx
import React from 'react';
import { PageGenerator, setReactNativePageConfig } from '@gaddario98/react-native-pages';

// Configure the library
setReactNativePageConfig({
  authPageImage: require('./assets/logo.png'),
});

const UserProfilePage = () => {
  return (
    <PageGenerator
      id="user-profile"
      ns="profile"
      queries={[
        {
          queryKey: ['user-profile'],
          queryFn: () => fetch('/api/user/profile').then(res => res.json()),
        }
      ]}
      form={{
        defaultValues: {
          firstName: '',
          lastName: '',
          email: '',
          bio: ''
        }
      }}
      contents={[
        {
          type: 'custom',
          component: (
            <Image 
              source={{ uri: 'https://example.com/avatar.jpg' }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          )
        },
        {
          type: 'input',
          name: 'firstName',
          config: {
            label: 'First Name',
            placeholder: 'Enter first name'
          }
        },
        {
          type: 'input',
          name: 'lastName',
          config: {
            label: 'Last Name',
            placeholder: 'Enter last name'
          }
        },
        {
          type: 'input',
          name: 'email',
          config: {
            label: 'Email',
            placeholder: 'Enter email',
            keyboardType: 'email-address'
          }
        },
        {
          type: 'input',
          name: 'bio',
          config: {
            label: 'Bio',
            placeholder: 'Tell us about yourself',
            multiline: true,
            numberOfLines: 4
          }
        },
        {
          type: 'submit',
          config: {
            title: 'Save Profile',
            onSubmit: (data) => {
              console.log('Saving profile:', data);
              // Handle profile save
            }
          }
        }
      ]}
      viewSettings={{
        disableRefreshing: false
      }}
      meta={{
        title: 'User Profile',
        description: 'Manage your profile information'
      }}
    />
  );
};

export default UserProfilePage;
```

## Dependencies

This library depends on several other packages in the @gaddario98 ecosystem:

- `@gaddario98/react-pages` - Core page generation logic
- `@gaddario98/react-native-ui` - UI components for React Native
- `@gaddario98/react-form` - Form management utilities
- `@gaddario98/react-queries` - Query management utilities
- `@gaddario98/utiles` - Common utilities

External dependencies:
- `@tanstack/react-query` - Data fetching and caching
- `react-hook-form` - Form state management
- `react-i18next` - Internationalization
- `react-native-draggable-flatlist` - Drag and drop functionality
- `@shopify/flash-list` - High-performance lists

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details.

## Author

**Giosuè Addario**

- GitHub: [@gaddario98](https://github.com/gaddario98)
- NPM: [@gaddario98](https://www.npmjs.com/~gaddario98)

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/gaddario98/react-native-pages/issues) on GitHub.
