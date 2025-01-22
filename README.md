# ProductHunter

Welcome to ProductHunter! a product search app with some cool features, such as:

- Search products
- Filter products by category
- Sort products by price or rating
- Paginate products on scroll
- See a specific product details, with additional info

The toolkit used to build this app was

- [React Native](https://reactnative.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [React Navigation](https://reactnavigation.org/) - for navigation and deep linking
- [react-native-fast-image](https://github.com/DylanVann/react-native-fast-image) - for image caching
- [react-native-onesignal](https://www.npmjs.com/package/react-native-onesignal) - for push notifications
- [use-debounce](https://www.npmjs.com/package/use-debounce) - to debounce the search and avoid unecessary multiple api calls
- [mitt](https://www.npmjs.com/package/mitt) - for emitting events
- [axios](https://www.npmjs.com/package/axios) - for api calls

### Some disclaimers

- Unfortunately, due to api limitations, it is not possible to search and filter products simultaneosly, and the app prevents this behavior
- Push notifications, even though it is set up for both platforms, only work on android because I don't have an paid Apple Developer Account

### How to build and run the project

- clone this repository
- run `cp .env.example .env` to create a `.env` file
- fill the `ONESIGNAL_APP_ID` on the `.env` file - `4998e1be-e69b-4d71-a4a6-0609f6ac842f`
- run `yarn` to install dependencies
- run `npx pod-install` or `cd ios && pod install && cd ../` to install pods
- run `yarn start` to start metro
- run `yarn android` or `yarn ios` to build the app on your desired platform

### How to test deep linking

- to open the homescreen, run the command `npx uri-scheme open "producthunter://" --platform`, where `platform` must be replaced with `ios` or `android`, for example: `npx uri-scheme open "producthunter://" --ios`
- to open a specific product, get an product id on the [api page](https://dummyjson.com/docs/products#products-all) (click on "Show Output" to see some products in the "Get all products" section), and run the command `npx uri-scheme open "producthunter://productDetails/id" --platform`, with `id` being the id of the product you picked and again with platform being either `ios` or `android`. For example `npx uri-scheme open "producthunter://productDetails/1" --ios`

### How to test push notifications

OneSignal recommends testing this on a physical device, it works on the emulator but takes longer to receive notifications

Basically, I would need to send the notification from inside the platform, but I can also invite someone to join the project, and I can give instructions on how to do it. Either way, feel free to reach me at `wgsquayson@gmail.com`
