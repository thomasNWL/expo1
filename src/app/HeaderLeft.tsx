import Colors from "@/constants/Colors";
import { Text, TouchableOpacity } from 'react-native';

const HeaderLeftComponent = ({ colorScheme, onPress }: any) => {
    // const { colorScheme } = useTheme();
    const onPress1 = () => {
        alert('Jack')
    }
    return (
        <TouchableOpacity onPress={onPress1} style={{ marginLeft: 15 }}>
            <Text style={{ color:"#000", fontSize: 16, fontWeight: '700'}}>
                Hi, Jack
            </Text>
        </TouchableOpacity>
    );
};

export default HeaderLeftComponent;