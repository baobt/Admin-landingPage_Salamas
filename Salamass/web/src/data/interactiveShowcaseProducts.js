import petFoodImage from '../../../images/thucnadongvat.jpg';
import interiorImage from '../../../images/noithat (1).jpg';

export const productsByLanguage = {
  vi: [
    { name: 'Nông sản thực phẩm', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e', price: '$12.99', unit: '/item', rating: 4.9, reviews: 128, category: 'Nông sản thực phẩm' },
    { name: 'Thức ăn cho thú cưng', image: petFoodImage, price: '$45.00', unit: '/item', rating: 5.0, reviews: 84, category: 'Thức ăn cho thú cưng' },
    { name: 'Thời trang', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050', price: '$39.00', unit: '/item', rating: 4.8, reviews: 173, category: 'Thời trang' },
    { name: 'Mỹ phẩm', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348', price: '$89.00', unit: '/item', rating: 4.8, reviews: 256, category: 'Mỹ phẩm' },
    { name: 'Nước hoa', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f', price: '$59.00', unit: '/item', rating: 4.9, reviews: 97, category: 'Nước hoa' },
    { name: 'Trang trí nội thất', image: interiorImage, price: '$74.00', unit: '/item', rating: 4.7, reviews: 142, category: 'Trang trí nội thất' },
  ],
  en: [
    { name: 'Agricultural Food Products', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e', price: '$12.99', unit: '/item', rating: 4.9, reviews: 128, category: 'Agricultural Food Products' },
    { name: 'Pet Food', image: petFoodImage, price: '$45.00', unit: '/item', rating: 5.0, reviews: 84, category: 'Pet Food' },
    { name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050', price: '$39.00', unit: '/item', rating: 4.8, reviews: 173, category: 'Fashion' },
    { name: 'Cosmetics', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348', price: '$89.00', unit: '/item', rating: 4.8, reviews: 256, category: 'Cosmetics' },
    { name: 'Perfume', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f', price: '$59.00', unit: '/item', rating: 4.9, reviews: 97, category: 'Perfume' },
    { name: 'Interior Decoration', image: interiorImage, price: '$74.00', unit: '/item', rating: 4.7, reviews: 142, category: 'Interior Decoration' },
  ],
  km: [
    { name: 'កសិផល និងអាហារ', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e', price: '$12.99', unit: '/item', rating: 4.9, reviews: 128, category: 'កសិផល និងអាហារ' },
    { name: 'អាហារសត្វចិញ្ចឹម', image: petFoodImage, price: '$45.00', unit: '/item', rating: 5.0, reviews: 84, category: 'អាហារសត្វចិញ្ចឹម' },
    { name: 'ម៉ូដសម្លៀកបំពាក់', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050', price: '$39.00', unit: '/item', rating: 4.8, reviews: 173, category: 'ម៉ូដសម្លៀកបំពាក់' },
    { name: 'គ្រឿងសំអាង', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348', price: '$89.00', unit: '/item', rating: 4.8, reviews: 256, category: 'គ្រឿងសំអាង' },
    { name: 'ទឹកអប់', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f', price: '$59.00', unit: '/item', rating: 4.9, reviews: 97, category: 'ទឹកអប់' },
    { name: 'តុបតែងគេហដ្ឋាន', image: interiorImage, price: '$74.00', unit: '/item', rating: 4.7, reviews: 142, category: 'តុបតែងគេហដ្ឋាន' },
  ],
};

export const getShowcaseProducts = (language) => productsByLanguage[language] || productsByLanguage.vi;