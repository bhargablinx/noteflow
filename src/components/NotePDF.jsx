import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 12,
        fontFamily: "Helvetica",
    },

    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: "bold",
    },

    content: {
        fontSize: 12,
        lineHeight: 1.6,
    },
});

export default function NotePDF({ title, content }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View>
                    <Text style={styles.title}>{title}</Text>

                    <Text style={styles.content}>{content}</Text>
                </View>
            </Page>
        </Document>
    );
}
