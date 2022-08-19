//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Button, Paragraph, Surface, Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

// create a component
const About = ({navigation}) => {
	return (
		<Surface style={{ flex: 1 }}>
			<SafeAreaView>
            <Appbar.Header style={{ backgroundColor: 'transparent' }}>
				<Appbar.BackAction onPress={navigation.goBack} />
				<Appbar.Content title="Terms & Conditions" />
			</Appbar.Header>
			<ScrollView style={{ paddingHorizontal: 30 }}>
				<Paragraph style={{ textAlign: 'justify' }}>
					DrugStoc Ehub Limited (“DrugStoc” or “we”) operates an eCommerce platform consisting of a website
					and mobile application, engaged in the wholesale and retail distribution of healthcare-related
					products (ethical and generic pharmaceutical products, vaccines, medical equipment, reagents and
					supplies, over the counter products and veterinary medicine. By using the Service, you become a
					“User” (“You” or “Customer” or “User”) and you agree to comply with and be bound by these Terms of
					Service (this “Agreement”).
				</Paragraph>
				<Paragraph style={{ textAlign: 'justify' }}>
					These general terms and conditions shall apply to all procurements on the marketplace and shall
					govern your use of related services.
				</Paragraph>
				<Paragraph style={{ textAlign: 'justify' }}>
					By using our services, you accept these general terms and conditions in full. If you disagree with
					these general terms and conditions or any part of these general terms and conditions, you must not
					use our services.
				</Paragraph>
				<Paragraph style={{ textAlign: 'justify' }}>
					If you use our service as a procurement partner, (Hospital, Pharmacy, Clinic, Licensed medical
					professional etc) in the course of a business or other organizational project, then by so doing you:
				</Paragraph>
				<Paragraph style={{ textAlign: 'justify' }}>
					confirm that you have obtained the necessary authority to agree to these general terms and
					conditions;
				</Paragraph>
				<Paragraph style={{ textAlign: 'justify' }}>
					bind both yourself and the person, company or other legal entity that operates that business or
					organizational project, to these general terms and conditions; and
				</Paragraph>
				<Paragraph style={{ textAlign: 'justify' }}>
					agree that “you” in these general terms and conditions shall reference both the individual user and
					the relevant person, company or legal entity unless the context requires otherwise.
				</Paragraph>
				<Title style={{ textAlign: 'center' }}>Registration & Accounts</Title>
				<Paragraph style={{ textAlign: 'justify' }}>
					You may establish an account with us after providing us with proof of license (Premise and
					Practicing license). You will also be required to submit a completed application and other personal
					details as required via our app, website or onsite.
				</Paragraph>
				<Title style={{ textAlign: 'center' }}>Product Availability</Title>
				<Paragraph style={{ textAlign: 'justify' }}>
					Items in stock are available for immediate shipment. In the event of excess demand or short supply,
					we reserve the right to reserve inventory among our customers as it deems appropriate. We shall not
					be liable for failure to fulfil any order or to perform under any contract due to strike, fire,
					unavoidable accidents, inability to obtain supplies, contingencies of manufacturing, or other causes
					beyond its control. We also reserve the right to discontinue and withdraw any product, product size,
					or packaging at any time from the app without further obligation on the part of DrugStoc
				</Paragraph>
				<Title style={{ textAlign: 'center' }}>Payment Terms</Title>
				<Paragraph style={{ textAlign: 'justify' }}>
					Purchases made on the platform are subject to cash and credit terms which are subject to the company
					discretion and can be changed or altered without prior notice.
				</Paragraph>
				<Title style={{ textAlign: 'center' }}>Pricing</Title>
				<Paragraph style={{ textAlign: 'justify' }}>
					Prices are subject to change without notice. Prices billed are the prices in effect at the time the
					order is shipped. Prices are subject to all taxes, excises, or other charges levied by any
					government (national, state or local). Any disputed prices must be identified to us in writing
					within two (2) business days from the invoice date.
				</Paragraph>
				<Title style={{ textAlign: 'center' }}>Damaged Goods</Title>
				<Paragraph style={{ textAlign: 'justify' }}>
					All shipments should be examined for damages immediately upon receipt. If you find broken or damaged
					goods, notify us by phone immediately.
				</Paragraph>
				<Title style={{ textAlign: 'center' }}>Purchase for Own Use</Title>
				<Paragraph style={{ textAlign: 'justify' }}>
					Sales are made with the express understanding and agreement that products are being purchased for
					use only in good condition. You are responsible for inspecting practice, and is not intended to be
					sold or transferred for further sale or resale by retailers, wholesalers or other parties.
				</Paragraph>
				<Title style={{ textAlign: 'center' }}>Indemnity and Liability </Title>
				<Paragraph style={{ textAlign: 'justify' }}>
					We will not be liable under any contract, negligence, strict liability or other theory of liability
					for any special, indirect, incidental or consequential damages product consumption or costs of
					procurement of substitute goods or services in connection with the subject matter of these terms and
					conditions or any products or the use, delivery or failure or delay of delivery thereof. We shall
					not be liable for any loss, claim, Manufacturer error, or damage resulting from products or the use,
					delivery, or failure of delivery thereof, and the buyer agrees to hold us harmless for any such
					loss, claim, or damage
				</Paragraph>
			</ScrollView>
			</SafeAreaView>
		</Surface>
	);
};

//make this component available to the app
export default About;
