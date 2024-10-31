const db = require('./db')
const {Restaurant, Menu, Item} = require('./models/index')
const {
    seedRestaurant,
    seedMenu,
  } = require('./seedData');

describe('Restaurant and Menu Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await db.sync({ force: true });
    });

    test('can create a Restaurant', async () => {
        const restaurant = await Restaurant.create({
            name: 'The Great Restaurant',
            location: '123 Food St',
            cuisine: 'International',
          });
      
          expect(restaurant.name).toBe('The Great Restaurant');
          expect(restaurant.location).toBe('123 Food St');
          expect(restaurant.cuisine).toBe('International');
    });

    test('can create a Menu', async () => {
        const restaurant = await Restaurant.create({
            name: 'The Great Restaurant',
            location: '123 Food St',
            cuisine: 'International',
          });
      
          const menu = await Menu.create({
            restaurantId: restaurant.id,
            title: 'Lunch Menu',
            description: 'A delicious selection of lunch items.',
          });
      
          expect(menu.title).toBe('Lunch Menu');
          expect(menu.description).toBe('A delicious selection of lunch items.');
          expect(menu.restaurantId).toBe(restaurant.id);
    });

    test('can find Restaurants', async () => {
        await Restaurant.bulkCreate(seedRestaurant);

        // Query all restaurants
        const foundRestaurants = await Restaurant.findAll();

        expect(foundRestaurants.length).toBe(seedRestaurant.length);
    });

    test('can find Menus', async () => {
        const restaurant = await Restaurant.create(seedRestaurant[0]);
        await Menu.bulkCreate(seedMenu.map(menu => ({
            ...menu,
            restaurantId: restaurant.id, // Associate menu with restaurant
        })));

        const foundMenus = await Menu.findAll();

        expect(foundMenus.length).toBe(seedMenu.length);
    });

    test('can delete Restaurants', async () => {
        const restaurant = await Restaurant.create(seedRestaurant[0]);

        await restaurant.destroy();
        const foundRestaurant = await Restaurant.findByPk(restaurant.id);

        expect(foundRestaurant).toBeNull();
    });

    test('should associate multiple Menus with a Restaurant', async () => {
        const restaurant = await Restaurant.create({
            name: 'Pizza Place',
            location: '123 Main St',
            cuisine: "Italian"
        });

        const menu1 = await Menu.create({
            title: 'Margherita Pizza',
            restaurantId: restaurant.id
        });

        const menu2 = await Menu.create({
            title: 'Pepperoni Pizza',
            restaurantId: restaurant.id
        });

        const menus = await restaurant.getMenus(); // Use the generated getMenus method from the association
        expect(menus).toHaveLength(2); // Check that there are 2 menus associated with the restaurant
        expect(menus[0].title).toBe('Margherita Pizza');
        expect(menus[1].title).toBe('Pepperoni Pizza');
    });

    test('can create an Item', async () => {
        const item = await Item.create({
            name: 'Bacon',
            image: 'test',
            price: 4.99,
            vegetarian: false
          });
      
          expect(item.name).toBe('Bacon');
          expect(item.iamge).toBe('test');
          expect(item.price).toBe(4.99);
          expect(item.vegetarian).toBe(false);
    });
})