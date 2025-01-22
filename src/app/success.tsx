import { Platform, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Image } from 'expo-image';
import { ProgressBar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { fetchSubmit } from '@/hooks/fetch1';
import { useNavigation } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/build/MaterialIcons';

export default function Success() {
    const [progress, setProgress] = useState(0.1);
    const navigation: any = useNavigation();
    const route = useRoute();
    const { js1 }: any = route.params;
    // alert(js1); 
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 1) {
                    clearInterval(interval);
                    fetchSubmit(js1).then((response) => {
                        console.log('Submit Response:', response);
                        setTimeout(() => {
                            navigation.reset({
                                index: 0, // 清空栈并导航到首页
                                routes: [{ name: 'index' }],
                            });
                        }, 2000);

                    }).catch((error) => {
                        console.error('Submit Error:', error);
                        
                    });
                    return 1;
                }
                return Math.min(parseFloat((prevProgress + 0.1).toFixed(2)), 1);
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [js1]);


    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff' }}>
            <Image
                source={require('../assets/images/demo/ai.jpg')}
                style={[styles.image, { marginTop: Platform.OS === 'ios' ? -20 : 20 }]}
            />
            {/* <MaterialIcons name="family-restroom" size={180} color="rgb(239, 132, 4)" /> */}
            <View style={styles.container}>
                <Text style={styles.title}>Connecting via WiFi, please wait</Text>

                <Text style={styles.waitingText}>Waiting...</Text>
                <ProgressBar progress={progress} color={'green'} style={styles.progressBar} />
                {/* 进度条下的说明文字 */}
                <Text style={styles.progressText}>Progress: {Math.round(progress * 100)}%</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 20,
        textAlign: 'center',
    },
    image: {
        width: '80%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
        marginTop: 20,
    },
    waitingText: {
        fontSize: 16,
        color: '#888',
        marginBottom: 20,
    },
    progressBar: {
        width: '100%', // 确保进度条占满父容器的宽度
        height: 10,    // 设置一个明确的高度

    },
    progressText: {
        fontSize: 16,
        color: '#333',
    },
});
