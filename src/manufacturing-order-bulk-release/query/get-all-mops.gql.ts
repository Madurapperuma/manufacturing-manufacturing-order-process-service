import { gql } from "graphql-request";

const GET_ALL_MOPS = gql `
query (
    $facility: String!
    $style: String!
    $co: String!
    $scheduleNo: Int
) {
    getAllMop(
    facility: $facility
    co: $co
    scheduleNo: $scheduleNo
    style: $style
    )
    {
      mmoplp {
        facility
        warehouse
        referenceOrderNumber
        referenceOrderCategory
        product
        mainProduct
        scheduleNumber
        company
        startDate
        releaseDate
        planningDate
        statusPlannedMo
        plannedQuantity
        plannedOrder
        finishDate
        itemForStockIssuesWipBySearch {
          userDefinedAccountingControlObject
          itemType
          company
          itemNumber 
        }
        requirmentOrderForStockIssuesWip{
          companyNo
          itemNo
          lineNo
          orderNo
          attributeId
          attributeValue 
        }
        customerGenericBySearch{  
          company
          primaryKey1
          primaryKey2
          file
          alphaField30PositionsF1A330
        }
        ooheadByManufacturingOrderSearch{
          company
          customerOrderNumber
          yourReference1
        }
        oolineByManufacturingOrderSearch{
          company
          itemNumber
          customerOrderNumber
          orderLineNumber
          lineSuffix
          planningDate
          addressNumber
          packagingTerms
          deliveryMethod
        }
        getItemNumberBySearch{
          company
          itemNumber
          optionSize
          optionColor
          featureZ
        } 
    }
      total
    }
}
`;

export { GET_ALL_MOPS };