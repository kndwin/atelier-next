import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
	mutation addProduct(
		$bottleName:String
		$bottleSize:String
		$bottleColor:String
		$closureName: String
		$closureColor: String
		$closureNeckSize: String
		$artworkImage: String
		$closureImage: String
		$primaryProductionTime:Int
		$closureProductionTime:Int
		$primaryDocument:String

		$boxType:String
		$boxMaterial:String
		$boxSize:String
		$shippingType:String
		$shippingMaterial:String
		$shippingSize:Int
		$cartonArtworkImage:String
		$cartonShippingImage:String
		$secondaryProductionTime:Int
		$secondaryDocument:String

		$ingredientsList:[String]
		$formulationProductionTime:Int
		$formulationDocument:String

		$userId:String
		$name:String
		$volume:Int
		$heroImage:String
		$manufacturingPlace:String
		$units:Int
		$pricePerUnit:Float
		$rrp:Int
		$margin:Int
		$productionTime:Int
		$labelPackaging:String
		$material:String
		$dimensions:String
		$inProduction:Int
		$image:String
		$document:String
		$carbonOffset:Int
		$primaryManufacturerIds:[String]
		$secondaryManufacturerId:[String]
		$formulationManufacturerId:[String]
		$labelManufacturerId:[String]
		$closureManufacturerId:[String]
		$amount:Int
		$closureDesc:String
		$lastProduction:DateTime
		$totalCount:Int
		$totalSold:Int
		$totalRating:Int
		$avgRating:Float
		$totalComplaints:Int
		$status:ProductStatus
	){
		addProduct(
			product:{
				userId : $userId
				name : $name
				volume : $volume
				heroImage : $heroImage
				manufacturingPlace : $manufacturingPlace
				units : $units
				pricePerUnit : $pricePerUnit
				rrp : $rrp
				margin : $margin

				bottleName:$bottleName
				bottleSize:$bottleSize
				bottleColor:$bottleColor
				closureName:$closureName
				closureColor:$closureColor
				closureNeckSize:$closureNeckSize
				artworkImage:$artworkImage
				closureImage:$closureImage
				primaryProductionTime:$primaryProductionTime
				closureProductionTime:$closureProductionTime
				primaryDocument:$primaryDocument

				boxType: $boxType
				boxMaterial: $boxMaterial
				boxSize: $boxSize
				shippingType: $shippingType
				shippingMaterial: $shippingMaterial
				shippingSize: $shippingSize
				cartonArtworkImage: $cartonArtworkImage
				cartonShippingImage: $cartonShippingImage
				secondaryProductionTime: $secondaryProductionTime
				secondaryDocument: $secondaryDocument

				ingredientsList:$ingredientsList
				formulationProductionTime:$formulationProductionTime
				formulationDocument:$formulationDocument

				productionTime : $productionTime
				labelPackaging : $labelPackaging
				material : $material
				dimensions : $dimensions
				inProduction : $inProduction
				image : $image
				document : $document
				carbonOffset : $carbonOffset
				primaryManufacturerIds : $primaryManufacturerIds
				secondaryManufacturerId : $secondaryManufacturerId
				formulationManufacturerId : $formulationManufacturerId
				labelManufacturerId : $labelManufacturerId
				closureManufacturerId : $closureManufacturerId
				amount : $amount
				closureDesc : $closureDesc
				lastProduction : $lastProduction
				totalCount : $totalCount
				totalSold : $totalSold
				totalRating : $totalRating
				avgRating : $avgRating
				totalComplaints : $totalComplaints
				status : $status
			}
		){
			name
		}
	}
`
