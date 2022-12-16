import { Loader } from './components/controller/loader';
import productsData from './mock/products.json';

const loader = new Loader(productsData);
const products = loader.getProducts();
