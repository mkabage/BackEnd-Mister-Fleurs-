const models = require('./models');
var User = require('./models/user');
var Product = require('./models/product');
const PROD_CONFIG = require('./config/production');
const DEV_CONFIG = require('./config/dev');
const CONFIG = process.env.NODE_ENV == 'production' ? PROD_CONFIG : DEV_CONFIG;

models.db(CONFIG.DB_URL).then(async () => {
    await Promise.all([
        User.deleteMany({}),
        Product.deleteMany({}),
      ]);

    const user = new User({
        name: 'User',
        password: 'pass',
        email: 'a@b.c'
      });

      const product1 = Product({
        name: "Printer",
        user: user,
        amount: 30,
        image: 'https://img.floweraura.com/sites/default/files/styles/new_image_style_339/public/Fresh-start_0.jpg'
      });

      const product2 = Product({
        name: "Screen",
        user: user,
        amount: 40,
        image: 'https://img.floweraura.com/sites/default/files/styles/new_image_style_339/public/Divine%20Love_0.jpg'
      });

      const product3 = Product({
        name: "Pink Rose Boquet",
        user: user,
        amount: 60,
        image: 'https://img.floweraura.com/sites/default/files/styles/new_image_style_339/public/Divine%20Love_0.jpg'
      });

      const product4 = Product({
        name: "First Step",
        user: user,
        amount: 80,
        image: 'https://img.floweraura.com/sites/default/files/styles/new_image_style_339/public/Divine%20Love_0.jpg'
      });

      await product1.save();
      await product2.save();
      await user.save();

      console.log('Seeding completed');
      process.exit();
});
