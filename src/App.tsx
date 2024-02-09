// src/App.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

const Product = ({ product, onAddToCart, isDescriptionExpanded, toggleDescription }: ProductProps) => (
  <ProductContainer>
    <ProductImage src={product.image} alt={product.name} />
    <ProductName>{product.name}</ProductName>
    <ProductDescription expanded={isDescriptionExpanded}>
      {product.description}
    </ProductDescription>
    <ToggleDescriptionButton onClick={toggleDescription}>
      {isDescriptionExpanded ? 'Einklappen' : 'Ausklappen'}
    </ToggleDescriptionButton>
    <ProductPrice>${product.price}</ProductPrice>
    <AddToCartButton onClick={onAddToCart}>Hinzufügen</AddToCartButton>
  </ProductContainer>
);

const Cart = ({ cartItems, onRemoveFromCart }: CartProps) => (
  <CartContainer>
    <h2>Warenkorb</h2>
    {cartItems.length === 0 ? (
      <EmptyCartMessage>Der Warenkorb ist leer.</EmptyCartMessage>
    ) : (
      cartItems.map((item) => (
        <CartItem key={item.id}>
          <CartItemInfo>
            <CartItemName>{item.name}</CartItemName>
            <CartItemPrice>${item.price}</CartItemPrice>
            <CartItemQuantity>{item.quantity}</CartItemQuantity>
          </CartItemInfo>
          <RemoveFromCartButton onClick={() => onRemoveFromCart(item.id)}>Entfernen</RemoveFromCartButton>
        </CartItem>
      ))
    )}
  </CartContainer>
);

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const products: ProductType[] = [
    { id: 1, name: 'Koffein 200 Tabletten', description: 'Koffeintabletten mit 200mg wasserfreiem Koffein. Pre Workout Booster für Sportler. Wachmacher für Beruf und Alltag.', price: 10, image: 'https://whey-protein.ch/media/catalog/product/cache/1/image/1024x/040ec09b1e35df139433887a97daa66f/k/o/koffein-200-tabletten.jpg' },
    { id: 2, name: 'ESN ASHWA PRO (120 KAPSELN)', description: 'In der heutigen Zeit kommt es im Alltag schnell zu Stress und innerer Unruhe. Schlaf und Erholungsphasen, die für den menschlichen Organismus zwingend notwendig sind, kommen dadurch häufig zu kurz. Ein negativer Effekt von dauerhaft zu hohem Stress kann ein erhöhter Cortisolspiegel sein. Cortisol steigt naturgemäss bei Stress an und setzt Energie – fast ohne Rücksicht auf Verluste, also unter Umständen auch durch die Unterbindung anderer körperlicher Prozesse – frei, um die Situation zu meistern. Damit du deiner inneren Unruhe und andauernden Müdigkeit nicht hilflos ausgeliefert bist, hat ESN ASHWA PRO entwickelt. Die Kapseln enthalten eine Kombination aus den hochwertigen Anti-Stress Nährstoffen Magnesium, Vitamin B6, Zink und dem patentierten Ashwagandha-Wurzelextrakt KSM-66®.', price: 15, image: 'https://www.starfitnutrition.ch/photo/data/esn-ashwa-pro-esn-supplements-go-greens-superfoods-nahrungsmittel-502-14428-4.png?ts=1704384878' },
    { id: 3, name: 'Bodylab24 Creatine Powder (500g)', description: 'Creatine Powder Pulver von Bodylab24 mit Neutral Geschmack. Creatine Powder von Bodylab24 Creatine (auch Kreatin bzw. Creatin) gehört zu den beliebtesten Sport-Supplements. Das ist nicht verwunderlich, denn Creatine ist deine geheime Wunderwaffe, wenn du Kraft und Leistungsfähigkeit steigern möchtest und Muskulatur aufbauen willst! Bei Creatine handelt es sich grundsätzlich um eine Aminosäure, zusammengesetzt aus Arginin, Glycin und Methionin. Creatine trägt zur Versorgung der Muskeln mit Energie bei. Zahlreiche Untersuchungen zu Creatine Monohydrat belegen die Möglichkeiten zur Leistungssteigerung durch Creatine-Einnahme. Die Europäische Behörde für Lebensmittelsicherheit (EFSA) hat in einer Erklärung für Kreatin folgende Wirkungsweise offiziell anerkannt: 3g Creatine pro Tag erhöhen die körperliche Leistung bei Schnellkrafttraining im Rahmen kurzzeitiger intensiver körperlicher Betätigung. Die Wirkung von Creatine Powder Creatine kann bei hochintensiven Aktivitäten wie beispielsweise Sprints, Krafttraining oder HIT Training leistungssteigernd wirken. Außerdem kann durch erhöhte Trainingsintensität der Muskelaufbau gefördert und die Energie und Explosivität gesteigert werden. Für welchen Sportler eignet sich Creatine Powder von Bodylab24? Ganz allgemein kann man festhalten, dass Creatine für jeden Sportler geeignet ist. Mittlerweile verwenden nicht nur Bodybuilder und Kraftsportler, sondern auch zahlreiche Ausdauersportler wie Läufer und Radfahrer Kreatinprodukte, um eine möglichst große Explosivität in Training und Wettkampf zu erzielen. Das Produkt ist nicht für Kinder und Jugendliche unter 18 Jahren geeignet', price: 20, image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQhuTFQ3-820ttsS282aw45IoH472MA1hHKqWphbxW-7eJatFz4gS-YhIB25ezy0CMcVCeP4KLDwtHj_NPR6qycsl4pV1TkSvZ7eQIrXgBDLJdL347I6J3t' },
  ];
  

  const addToCart = (product: ProductType) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <Container>
      <ProductList>
        <h2>Produkte</h2>
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            onAddToCart={() => addToCart(product)}
            isDescriptionExpanded={isDescriptionExpanded}
            toggleDescription={toggleDescription}
          />
        ))}
      </ProductList>
      <Cart cartItems={cart} onRemoveFromCart={removeFromCart} />
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProductList = styled.div`
  flex: 1;
`;

const ProductContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const ProductName = styled.h3`
  color: #333;
`;

const ProductDescription = styled.p<{ expanded: boolean }>`
  color: #666;
  overflow: hidden;
  max-height: ${(props) => (props.expanded ? '1000px' : '80px')};
  transition: max-height 0.3s ease;
`;

const ToggleDescriptionButton = styled.button`
  background-color: #f8f9fa;
  color: #007bff;
  border: 1px solid #007bff;
  padding: 5px;
  cursor: pointer;
  font-size: 12px;
  margin-top: 10px;
`;

const ProductPrice = styled.p`
  font-weight: bold;
  color: #007bff;
  margin-top: 10px;
`;

const AddToCartButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const CartContainer = styled.div`
  flex: 1;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
`;

const EmptyCartMessage = styled.p`
  color: #777;
`;

const CartItem = styled.div`
  margin-bottom: 10px;
  color: #333;
`;

const CartItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartItemName = styled.span`
  flex: 1;
`;

const CartItemPrice = styled.span`
  margin-left: 10px;
`;

const CartItemQuantity = styled.span`
  margin-left: 10px;
`;

const RemoveFromCartButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 12px;
  border-radius: 4px;
  margin-left: 10px;
`;

// TypeScript-Typen
type ProductType = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

type CartItemType = ProductType & {
  quantity: number;
};

type ProductProps = {
  product: ProductType;
  onAddToCart: () => void;
  isDescriptionExpanded: boolean;
  toggleDescription: () => void;
};

type CartProps = {
  cartItems: CartItemType[];
  onRemoveFromCart: (id: number) => void;
};

export default App;
