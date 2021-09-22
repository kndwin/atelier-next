import Disclosure from "components/Common/Disclosure";
import Status from "components/Common/Status";
import Table from "components/Common/Table";
import { Row, Cell, Header } from "components/Common/Table";
import styles from "./styles.module.scss";

import Illustrator from "public/svg/file-illustrator.svg"

const ProductOverview = (props) => {
  const overviewData = {
    title: [
      "Total Units",
      "Average",
      "Actual Production",
      "Production",
      "On-time",
    ],
    data: [
      {
        totalUnits: "30,000",
        average: "$6.90",
        actualProduction: "45 days",
        production: "40 days",
        onTime: "100%",
      },
    ],
  };

  const productSpecificationData = [
    {
      title: ["Primary packaging", "Label", "Secondary packaging"],
      data: [
        {
          primaryPackaging: [
						{ image: "images/bottle-empty.png", caption: "15ml" },
						{ image: "images/eye-drop.png" , caption: "Black"},
          ],
					label: [{ image: "images/bottle-wrap-around.png", caption: "Wrap around" }],
					secondaryPackaging: [{ image: "images/box.png", caption: "300GSM" }],
        },
      ],
    },
    {
      title: ["Formulation"],
      data: [
        {
          formulation:
            "Water (Aqua), Glycerin, Squalane, Coco-Caprylate, Tribehenin PEG 20 Esters, Simmondsia Chinensis (Jojoba) Seed Oil, Jojoba Esters, Sodium Acrylates Copolymer, Phenoxyethanol, Saccharide Isomerate, Helianthus Annuus (Sunflower) Seed Wax, Ethylhexylglycerin, Lecithin, Silica.",
        },
      ],
    },
  ];

  const orderData = {
    title: ["Order no", "date", "product", "amount", "ap time", "status"],
    data: [
			{
				orderNo: "00001",
				date: "22/6/20",
				product: "wonder",
				amount: "$36,700",
				apTime: "45 days",
				status: "PENDING"
			},{
				orderNo: "00001",
				date: "22/6/20",
				product: "wonder",
				amount: "$36,700",
				apTime: "45 days",
				status: "COMPLETE"
			},{
				orderNo: "00001",
				date: "22/6/20",
				product: "wonder",
				amount: "$36,700",
				apTime: "45 days",
				status: "IN_PRODUCTION"
			}
    ],
  };

	const color = {
		PENDING: 'orange',
		COMPLETE: 'blue',
		IN_PRODUCTION: 'green'
	}
  const designData = {
    title: ["Primary packaging", "Label", "Secondary packaging"],
    data: [["Last udpated on", "Last udpated on", "Last udpated on"]],
  };


  return (
    <div className={styles.productOverviewWrapper}>
      <Disclosure title="Overview">
        <Table title={overviewData.title} data={overviewData.data}>
          <Header>
            {overviewData.title.map((cell) => (
              <Cell bold>{cell}</Cell>
            ))}
          </Header>
          {overviewData.data.map(
            ({ totalUnits, average, actualProduction, production, onTime }) => (
              <Row>
                <Cell>{totalUnits}</Cell>
                <Cell>{average}</Cell>
                <Cell>{actualProduction}</Cell>
                <Cell>{production}</Cell>
                <Cell>{onTime}</Cell>
              </Row>
            )
          )}
        </Table>
      </Disclosure>
      <div className={styles.spacer} />
      <Disclosure title="Product Specification">
        <Table>
          <Header>
            {productSpecificationData[0].title.map((title) => (
              <Cell bold>{title}</Cell>
            ))}
          </Header>
          {productSpecificationData[0].data.map(
            ({ primaryPackaging, label, secondaryPackaging }) => (
              <Row>
                <Cell>
                  <Row styles={{ }}>
                    {primaryPackaging.map(({ image, caption }) => (
                      <Cell>
                        <img className={styles.image} src={image} alt="" />
												<p className={styles.caption}>{caption}</p>
                      </Cell>
                    ))}
                  </Row>
                </Cell>
                <Cell>
                  <Row>
                    {label.map(({ image, caption }) => (
                      <Cell>
                        <img className={styles.image} src={image} alt="" />
												<p className={styles.caption}>{caption}</p>
                      </Cell>
                    ))}
                  </Row>
                </Cell>
                <Cell>
                  <Row>
                    {secondaryPackaging.map(({ image, caption }) => (
                      <Cell>
                        <img className={styles.image} src={image} alt="" />
												<p className={styles.caption}>{caption}</p>
                      </Cell>
                    ))}
                  </Row>
                </Cell>
              </Row>
            )
          )}
        </Table>
        <Table>
          <Header>
            {productSpecificationData[1].title.map((title) => (
              <Cell bold>{title}</Cell>
            ))}
          </Header>
					<Row>
						<Cell>
							{productSpecificationData[1].data[0].formulation}
						</Cell>
					</Row>
        </Table>
      </Disclosure>
      <div className={styles.spacer} />
      <Disclosure title="Order History">
				<Table>
					<Header>
						{orderData.title.map(title => (
							<Cell bold>{title}</Cell>
						))}
					</Header>
					{orderData.data.map(({ orderNo, date, product, amount, apTime, status }) => (
						<Row>
							<Cell>{orderNo}</Cell>
							<Cell>{date}</Cell>
							<Cell>{product}</Cell>
							<Cell>{amount}</Cell>
							<Cell>{apTime}</Cell>
							<Cell>
								<Status width='100%' align='center' color={color[status]}>
									{status.replace('_', ' ')}
								</Status>
							</Cell>
						</Row>
					))}
				</Table>
      </Disclosure>
      <div className={styles.spacer} />
      <Disclosure title="Design">
				<Table>
					<Header>
						{designData.title.map(title => (
							<Cell bold>{title}</Cell>
						))}
					</Header>
					{designData.data.map(row => (
						<Row>
							{row.map(cell => (
								<Cell>
									<Illustrator />
									<p className={styles.caption}>
										{cell}
									</p>
								</Cell>
							))}
						</Row>
					))}
				</Table>
			</Disclosure>
		</div>
	);
};

export default ProductOverview;
