import { StyleSheet, Text, View } from 'react-native';
import { useRef, useState } from 'react';
import Button from './Button';

export default function Calculator() {
    const numberList = useRef([]);
    const [output, setOutput] = useState("");

    const toOutput = () => {
        const output = numberList.current.join("");
        setOutput(output);
        console.log(numberList.current);
    };
    
    const solve = () => {
        const value = numberList.current.join("");
        const evaluated = Function(`return ${value}`)();
        numberList.current = String(evaluated).split("");
        toOutput();
    };

    const addNumber = (number) => {
        numberList.current = [...numberList.current, number];
        toOutput();
    };

    const delNumber = () => {
        numberList.current = numberList.current.slice(0, numberList.current.length - 1);
        toOutput();
    };
 
    const clearNumber = () => {
        numberList.current = [];
        toOutput();
    };

    return (
        <View style={styles.calculatorContainer}>
            <View style={styles.outputContainer}>
                <Text style={styles.output}>{output}</Text>
            </View>
            <View style={styles.btnContainer}>
                <View style={styles.btnRow}>
                    <Button name="remover" value="AC" onPress={clearNumber} />
                    <Button name="remover" value="DEL" onPress={delNumber} />
                </View>
                <View style={styles.btnRow}>
                    <Button name="number" value="7" onPress={() => {addNumber("7")}} />
                    <Button name="number" value="8" onPress={() => {addNumber("8")}} />
                    <Button name="number" value="9" onPress={() => {addNumber("9")}} />
                    <Button name="operator" value="&divide;" onPress={() => {addNumber("/")}} />
                </View>
                <View style={styles.btnRow}>
                    <Button name="number" value="4" onPress={() => {addNumber("4")}} />
                    <Button name="number" value="5" onPress={() => {addNumber("5")}} />
                    <Button name="number" value="6" onPress={() => {addNumber("6")}} />
                    <Button name="operator" value="&times;" onPress={() => {addNumber("*")}} />
                </View>
                <View style={styles.btnRow}>
                    <Button name="number" value="1" onPress={() => {addNumber("1")}} />
                    <Button name="number" value="2" onPress={() => {addNumber("2")}} />
                    <Button name="number" value="3" onPress={() => {addNumber("3")}} />
                    <Button name="operator" value="&minus;" onPress={() => {addNumber("-")}} />
                </View>
                <View style={styles.btnRow}>
                    <Button name="number" value="." onPress={() => {addNumber(".")}} />
                    <Button name="number" value="0" onPress={() => {addNumber("0")}} />
                    <Button name="operator" value="=" onPress={() => {solve()}} />
                    <Button name="operator" value="+" onPress={() => {addNumber("+")}} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    calculatorContainer: {
        width: "100%"
    },

    outputContainer: {
        
    },

    output: {
        color: "#fff"
    },

    btnContainer: {
        // backgroundColor: "red"
    },

    btnRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }
});