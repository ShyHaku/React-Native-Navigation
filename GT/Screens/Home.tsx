import React, { useState } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, Modal, Button } from 'react-native';
import styles from './style';
import { useCart } from '../Context';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const imageMapping = {
  'Pevo.jpg': require('../assets/Pevo.jpg'),
  'PCWW.jpg': require('../assets/PCWW.jpg'),
  'SVBB.jpg': require('../assets/SVBB.jpg'),
  'SVPR.jpg': require('../assets/SVPR.jpg'),
  'SVSM.jpg': require('../assets/SVSM.jpg'),
  'TCG.jpg': require('../assets/TCG.jpg'),
  'TCGU.jpg': require('../assets/TCGU.jpg'),
};

const productsData = [
  { id: '1', name: 'TCG: Scarlet & Violet - Prismatic Evolutions Booster Bundle', price: 2500, imageName: 'Pevo.jpg' },
  { id: '2', name: 'TCG Scarlet & Violet 3.5 Pokemon 151 Booster Bundle', price: 2000 , imageName: 'SVBB.jpg' },
  { id: '3', name: 'Card Game Scarlet & Violet Expansion Pack Stellar Miracle Booster Box (Japanese)', price: 2900, imageName: 'SVSM.jpg' },
  { id: '4', name: 'Scarlet & Violet 4: Paradox Rift Booster Build & Battle Box - 4 Packs, Promos', price: 1200, imageName: 'SVPR.jpg' },
  { id: '5', name: 'TCG: Paradox Clash TIN: Iron Leaves EX OR Walking Wake EX', price: 1700, imageName: 'PCWW.jpg' },
  { id: '6', name: 'Official TCG: Shining Fates Booster Pack', price: 260, imageName: 'TCG.jpg' },
  { id: '7', name: 'Pokemon Sun & Moon Unified Minds Booster Pack', price: 300, imageName: 'TCGU.jpg' },
];

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { addToCart } = useCart();
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [showQuantityModal, setShowQuantityModal] = useState<boolean>(false);
  const [productToAdd, setProductToAdd] = useState<any>(null);

  const handleAddToCartClick = (product: any) => {
    setProductToAdd(product); 
    setSelectedProductId(product.id);
    setShowQuantityModal(true);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleConfirmAddToCart = () => {
    if (productToAdd) {
      addToCart({
        ...productToAdd,
        quantity: quantity,
      });
      setShowQuantityModal(false); 
      setSelectedProductId(null); 
      setQuantity(1);
    }
  };

  const handleCancelAddToCart = () => {
    setShowQuantityModal(false);
    setQuantity(1);
  };

  const getImageSource = (imageName: string) => {
    return require(`../assets/${imageName}`);
  };

  const renderItem = ({ item }: { item: { id: string; name: string; price: number; imageName: string } }) => (
    <View style={styles.productContainer}>
      <Image source={getImageSource(item.imageName)} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>Php {item.price}</Text>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => handleAddToCartClick(item)}
      >
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={productsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={styles.cartButtonContainer}
        onPress={() => navigation.navigate('Cart')}
      >
        <Icon name="shopping-cart" size={25} style={styles.cartButtonIcon} />
      </TouchableOpacity>
      <Modal
        visible={showQuantityModal}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCancelAddToCart}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Quantity</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                onPress={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                style={styles.quantityButton}
              >
                <Icon name="minus" size={20} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                onPress={() => handleQuantityChange(quantity + 1)}
                style={styles.quantityButton}
              >
                <Icon name="plus" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalActions}>
              <Button title="Cancel" onPress={handleCancelAddToCart} color="#8C6D3F" />
              <Button title="Confirm" onPress={handleConfirmAddToCart} color="#8C6D3F" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
