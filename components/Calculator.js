import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRef, useState } from 'react';
import useField from '../hooks/useField';
import History from './History';
import Button from './Button';

export default function Calculator() {
    const [field, symbolicField, fields, setField] = useField([0]);

    const questionHistory = useRef([]);
    const questionHistoryOutput = useRef("");
    const [historyPairs, setHistoryPairs] = useState([]);

    const setQuestionHistory = (value) => {
        questionHistory.current = value;
    };

    const toQuestionHistoryOutput = () => {
        questionHistoryOutput.current = questionHistory.current.join("");
    };

    const pushHistoryPairs = (values) => {
        const question = questionHistoryOutput.current;
        const result = values.join("")
        const output = [question, result];
        setHistoryPairs((h) => [...h, output]);
    };
    
    const solve = () => {
        try {
            const evaluated = Function(`return ${field}`)();
            const fixedEvaluated = Math.round(evaluated * 1e15) / 1e15;
            const values = String(fixedEvaluated).split("");
            setField(values);
            pushHistoryPairs(values);
        } catch (err) {
            Alert.alert("Error", "Invalid math expression!");
            setField([]);
        }
    };

    const addNumber = (number) => {
        const values = [...fields, number];
        setField(values);
        setQuestionHistory(values);
        toQuestionHistoryOutput();
    };

    const delNumber = () => {
        const values = fields.slice(0, fields.length - 1);
        setField(values);
        setQuestionHistory(values);
        toQuestionHistoryOutput();
    };
 
    const clearNumber = () => {
        const values = [];
        setField(values);
        setQuestionHistory(values);
        toQuestionHistoryOutput();
    };

    return (
        <View style={styles.calculatorContainer}>
            <History values={historyPairs} />
            <View style={styles.outputContainer}>
                <Text style={styles.output}>{symbolicField}</Text>
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
        paddingVertical: 5,
        paddingHorizontal: 4
    },

    output: {
        color: "#fff",
        fontSize: 50,
        textAlign: "right"
    },

    btnRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }
});