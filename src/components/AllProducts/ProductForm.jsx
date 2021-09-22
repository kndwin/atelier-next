import { Dropdown, Input, Button } from "components";
import styles from "./styles.module.scss";
import DownloadFolder from "public/svg/download-folder.svg";
import Table, { Row, Cell, Header } from "components/Common/Table";
import SearchBar from "components/Common/SearchBar";
import Plus from "public/svg/plus-box-icon.svg";
import Textarea from "components/Common/Textarea";

const ProductForm = (props) => {
  return (
    <div className={styles.productFormWrapper}>
      <p className={styles.title}>New Product Form</p>
      <ProductDetails />
      <ProductPricing />
      <CompanyDetails />
      <Formulation />
      <Design />
    </div>
  );
};

export default ProductForm;

const Upload = (props) => {
  const { height, width, style, ...newProps } = props;
  return (
    <div
      className={styles.upload}
      style={{ ...style, height, width }}
      {...newProps}
    >
      <DownloadFolder />
      <p className={styles.uploadText}>
        Drag & Drop or <br />
        Click to Upload
      </p>
    </div>
  );
};

const ProductDetails = () => {
  const placeOfManufacturingOptions = [
    { title: "Option 1" },
    { title: "Option 2" },
    { title: "Option 3" },
  ];
  return (
    <div className={styles.section}>
      <p className={styles.title}>Product Details</p>
      <div className={styles.gridTwoCol}>
        <div>
          <Input className={styles.inputs} placeholder="INSERT PRODUCT NAME" />
          <Input className={styles.inputs} placeholder="PRODUCT VOLUME" />
          <Dropdown
            className={styles.inputs}
            placeholder="PLACE OF MANUFACTORING"
            options={placeOfManufacturingOptions}
          />
          <Input className={styles.inputs} placeholder="CARBON OFFSET" />
        </div>
        <Upload width="10em" />
      </div>
    </div>
  );
};

const ProductPricing = () => {
  const data = [
    { units: 1_000, pricePer: 9.14, rrp: 199.0, margin: 76.52, prodTime: 40 },
    { units: 1_000, pricePer: 9.14, rrp: 199.0, margin: 76.52, prodTime: 40 },
    { units: 1_000, pricePer: 9.14, rrp: 199.0, margin: 76.52, prodTime: 40 },
    { units: 1_000, pricePer: 9.14, rrp: 199.0, margin: 76.52, prodTime: 40 },
    { units: 1_000, pricePer: 9.14, rrp: 199.0, margin: 76.52, prodTime: 40 },
    { units: 1_000, pricePer: 9.14, rrp: 199.0, margin: 76.52, prodTime: 40 },
    { units: 1_000, pricePer: 9.14, rrp: 199.0, margin: 76.52, prodTime: 40 },
    { units: 1_000, pricePer: 9.14, rrp: 199.0, margin: 76.52, prodTime: 40 },
  ];
  return (
    <div className={styles.section}>
      <p className={styles.title}>Product Pricing</p>
      <Table>
        <Header shadow>
          <Cell bold>Units</Cell>
          <Cell bold>Price Per</Cell>
          <Cell bold>RRP</Cell>
          <Cell bold>Margin</Cell>
          <Cell bold>Production Time In</Cell>
        </Header>
        {data.map(({ units, pricePer, rrp, margin, prodTime }) => (
          <Row className={styles.row} shadow>
            <Cell>{units.toLocaleString()}</Cell>
            <Cell>$ {pricePer}</Cell>
            <Cell>$ {rrp}</Cell>
            <Cell>{margin}%</Cell>
            <Cell>{prodTime} DAYS</Cell>
          </Row>
        ))}
      </Table>
    </div>
  );
};

const CompanyDetails = () => {
  const assignManufactorOptions = [
    { title: "Option 1" },
    { title: "Option 2" },
    { title: "Option 3" },
  ];
  return (
    <div className={styles.section}>
      <p className={styles.title}>Company Details</p>
      <p className={styles.subtitle}>Primary packaging</p>
      <div className={styles.gridTwoCol}>
        <div>
          <Upload height="fit-content" />
          <Input className={styles.inputs} placeholder="LABEL TYPE" />
          <Input className={styles.inputs} placeholder="LABEL MATERIAL" />
          <Input className={styles.inputs} placeholder="LABEL DIMENSIONS" />
          <SearchBar
            className={styles.inputs}
            placeholder="ADD/ASSIGN MANUFACTURER"
            options={assignManufactorOptions}
          />
          <p className={styles.text}>Add new manufacturer</p>
          <p className={styles.text}>
            <Plus className={styles.icon} /> Add another packaging component
          </p>
        </div>
        <div>
          <Upload height="fit-content" />
          <Input className={styles.inputs} placeholder="BOX TYPE" />
          <div className={styles.gridTwoCol}>
            <Input className={styles.inputs} placeholder="SIZE/DIMENSIONS" />
            <Input className={styles.inputs} placeholder="BOX MATERIAL" />
          </div>
          <Input
            className={styles.inputs}
            placeholder="PRODUCTION TIME IN DAYS"
          />
          <SearchBar
            className={styles.inputs}
            placeholder="ASSIGN/ADD MANUFACTURER"
            options={assignManufactorOptions}
          />
        </div>
      </div>
			<div className={styles.spacer} />
      <div className={styles.gridTwoCol}>
        <div>
          <p className={styles.subtitle}>Label</p>
          <Upload height="fit-content" />
          <Input className={styles.inputs} placeholder="LABEL TYPE" />
          <Input className={styles.inputs} placeholder="LABEL MATERIAL" />
          <Input className={styles.inputs} placeholder="LABEL DIMENSIONS" />
          <SearchBar
            className={styles.inputs}
            placeholder="ADD/ASSIGN MANUFACTURER"
            options={assignManufactorOptions}
          />
          <p className={styles.text}>
            <Plus className={styles.icon} /> Add another packaging component
          </p>
        </div>
        <div>
          <p className={styles.subtitle}>Secondary packaging</p>
          <Upload height="fit-content" />
          <Input className={styles.inputs} placeholder="BOX TYPE" />
          <div className={styles.gridTwoCol}>
            <Input className={styles.inputs} placeholder="SIZE/DIMENSIONS" />
            <Input className={styles.inputs} placeholder="BOX MATERIAL" />
          </div>
          <Input
            className={styles.inputs}
            placeholder="PRODUCTION TIME IN DAYS"
          />
          <SearchBar
            className={styles.inputs}
            placeholder="ASSIGN/ADD MANUFACTURER"
            options={assignManufactorOptions}
          />
          <p className={styles.text}>
            <Plus className={styles.icon} /> Add another packaging component
          </p>
        </div>
      </div>
    </div>
  );
};

const Formulation = () => {
  return (
		<div className={styles.section}>
			<p className={styles.title}>Formulation</p>
			<Textarea 
				placeholder='INSERT FORMULATION HERE'
			/>
			<div className={styles.gridTwoCol}>
				<Input placeholder="PRODUCTION IN DAYS}" />
				<SearchBar placeholder="ADD/ASSIGN MANUFACTURER" />
			</div>
			<div className={styles.flexReverse}>
				<Button size="small" width="13em" align="center">
					Save
				</Button>
			</div>
		</div>
	);
};

const Design = () => {
	return (
		<div className={styles.section}>
      <p className={styles.title}>Design</p>
			<div className={styles.gridThreeCol}>
				<div>
					<p className={styles.subtitle}>Primary Packaging</p>
					<Upload height="fit-content" />
				</div>
				<div>
					<p className={styles.subtitle}>Secondary Packaging</p>
					<Upload height="fit-content" />
				</div>
				<div>
					<p className={styles.subtitle}>Label</p>
					<Upload height="fit-content" />
				</div>
			</div>
			<div className={styles.flexReverse}>
				<Button size="small" width="13em" align="center">
					Save
				</Button>
			</div>
		</div>
	);
};
