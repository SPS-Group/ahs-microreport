const settings = `
  

{
  "rowKeyField": "_key",
  "pdfFontSize": 8,
  "pdfOrientation": "portrait",
  "cellColor": "
    console.log({scope});
  ",
  "autoRefresh": 10000,
  "mobileCardTemplate": "
      <div>
          <h1>{name}</h1>
          <h1>{email}</h1>
      </div>
      <div>
          <h3>{supply}</h3>
          <h3>{item}</h3>
      </div>
      <div>
          <h2></h2>
          <div>{reqDate}</div>
      </div>
  ",
  "groups": ["item"],
  "optionsGroup": ["item", "supply", "branch"],
  "footerButtons": [
      {
          "text": "Criar pedidos",
          "type": "Emphasized",
          "handler": "
                  const {
                    treatError,
                    getSelectedData,
                    executeScalar,
                    executeSql,
                    serviceLayer,
                    showLoading,
                    refresh
                    prompt,
                  } = scope;

                  async function getBusinessPartnerInfo(cardCode) {
                  const businessPartnerInfo = await executeScalar(\`
                  select bp.CntctPrsn as contactId,
                        bp.PymCode as paymentMethodId,
                        bp.GroupNum as paymentGroupCode
                  from OCRD bp
                  where bp.CardCode = '\${cardCode}'
                  \`);

                  return businessPartnerInfo;
                  }

                  function getSuppliersOf(items) {
                  const suppliersOfItems = [];

                  items.forEach(item => {
                  if (!suppliersOfItems.find(s => s.supplyCode === item.supplyCode)) {
                  suppliersOfItems.push({
                    supplyCode: item.supplyCode,
                    branches: [],
                  });
                  }
                  });

                  return suppliersOfItems;
                  }

                  function putBranchesAndItemsInSuppliers(suppliersOfItems, items) {
                  return suppliersOfItems.map(supplier => {
                  const itemsOfSupplier = items.filter(
                  item => item.supplyCode === supplier.supplyCode
                  );

                  const itemsGroupedByBranches = [];

                  for (
                  let itemIndex = 0;
                  itemIndex < itemsOfSupplier.length;
                  itemIndex += 1
                  ) {
                  const item = itemsOfSupplier[itemIndex];

                  let branch = itemsGroupedByBranches.find(
                    b => b.branchId === item.branchId
                  );

                  if (!branch) {
                    branch = {
                      branchId: item.branchId,
                      items: [],
                    };

                    itemsGroupedByBranches.push(branch);
                  }

                  branch.items.push(item);
                  }

                  return {
                  ...supplier,
                  branches: itemsGroupedByBranches,
                  };
                  });
                  }

                  function getDocDueDate(documentLines) {
                  const sortByShipDateDesc = (lineA, lineB) => {
                  if (lineA.ShipDate < lineB.ShipDate) return 1;
                  if (lineA.ShipDate > lineB.ShipDate) return -1;
                  return 0;
                  };

                  const linesSortByShipDateDesc = [...documentLines].sort(
                  sortByShipDateDesc
                  );
                  const latestLine = linesSortByShipDateDesc[0] || {};
                  return latestLine.ShipDate;
                  }

                  async function sendOrdersForEachBranch(
                  branches,
                  supplier,
                  businessPartnerInfo
                  ) {
                  const promises = [];
                  for (
                  let branchIndex = 0;
                  branchIndex < branches.length;
                  branchIndex += 1
                  ) {
                  const branch = branches[branchIndex];

                  const DocumentLines = branch.items.map(item => {
                  return {
                    ItemCode: item.itemCode,
                    Quantity: item.quantity,
                    WarehouseCode: item.warehouseCode,
                    UnitPrice: item.unitPrice,
                    BaseType: 540000006,
                    BaseEntry: item.purchaseQuotationEntry,
                    BaseLine: item.purchaseQuotationLine,
                    ShipDate: item.shipDate,
                  };
                  });

                  const DocDueDate = getDocDueDate(DocumentLines);
                  const data = {
                  CardCode: supplier.supplyCode,
                  ContactPersonCode: businessPartnerInfo.contactId,
                  BPL_IDAssignedToInvoice: branch.branchId,
                  DocDate: new Date(),
                  DocDueDate,
                  PaymentMethod: businessPartnerInfo.paymentMethodId,
                  PaymentGroupCode: businessPartnerInfo.paymentGroupCode,
                  DocumentLines,
                  };

                  promises.push(
                  serviceLayer({
                    method: 'POST',
                    url: 'PurchaseOrders',
                    data,
                  })
                  );
                  }

                  await Promise.all(promises);
                  }

                  async function sendAllOrdersForEachSupplierAndForEachBranch(
                  suppliersWithBranchesAndItems
                  ) {
                  for (
                  let supplierIndex = 0;
                  supplierIndex < suppliersWithBranchesAndItems.length;
                  supplierIndex += 1
                  ) {
                  const supplier = suppliersWithBranchesAndItems[supplierIndex];

                  const businessPartnerInfo = await getBusinessPartnerInfo(
                  supplier.supplyCode
                  );

                  await sendOrdersForEachBranch(
                  supplier.branches,
                  supplier,
                  businessPartnerInfo
                  );
                  }
                  }

                  function confirmBeforeCreate() {
                  const confirmation = new Promise((onConfirm, onCancel) => {
                  prompt({
                  title: 'Criação de pedido',
                  type: 'question',
                  message: 'Deseja mesmo criar os pedidos?',
                  onConfirm,
                  onCancel,
                  });
                  });

                  return confirmation;
                  }

                  function checkSelection() {
                  if (!getSelectedData().length) {
                  throw new Error('Selecione pelo menos um item para criar o pedido.');
                  }
                  }

                  function askToCloseGroupPurchaseQuotations() {
                  const confirmation = new Promise((onConfirm, onCancel) => {
                  prompt({
                  title: 'Fechamento de Ofertas de compra',
                  type: 'question',
                  message: 'Você deseja fechar as ofertas de compra desse grupo?',
                  onConfirm,
                  onCancel,
                  });
                  });

                  return confirmation;
                  }

                  function closeGroupPurchaseQuotations() {
                  getSelectedData().forEach(line => {
                  executeSql(\`
                          update OPQT
                          set DocStatus = 'C'
                          where PQTGrpNum = \${line.groupNumber}
                      \`);

                  executeSql(\`
                          update PQT1
                          set LineStatus = 'C'
                          from OPQT
                          where OPQT.PQTGrpNum=\${line.groupNumber} and
                                OPQT.DocEntry = PQT1.DocEntry
                      \`);
                  });
                  }

                  try {
                  checkSelection();

                  confirmBeforeCreate()
                  .then(
                  () => {
                    showLoading(true);
                    const items = getSelectedData().sort((itemA, itemB) => {
                      return ('' + itemA.itemCode).localeCompare(itemB.itemCode);
                    });

                    const suppliersOfItems = getSuppliersOf(items);

                    const suppliersWithBranchesAndItems = putBranchesAndItemsInSuppliers(
                      suppliersOfItems,
                      items
                    );

                    sendAllOrdersForEachSupplierAndForEachBranch(
                      suppliersWithBranchesAndItems
                    )
                      .then(() => {
                        console.log({suppliersWithBranchesAndItems});
                        askToCloseGroupPurchaseQuotations()
                          .then(closeGroupPurchaseQuotations, () => {})
                          .catch(err => {
                            treatError(err);
                          })
                          .finally(() => {
                            alert('Pedidos criados com sucesso!');

                    refresh();
                          });
                      })
                      .catch(err => {
                        treatError(err);
                      });
                  },

                  () => false
                  )
                  .catch(err => {
                  treatError(err);
                  })
                  .finally(() => {
                  showLoading(false);
                  });
                  } catch (err) {
                  treatError(err);
                  }
          "
      }
  ],
  "columns": [
      {
          "name": "selection",
          "type": "selection",
          "title": "Selecionar",
          "onValidate": "
             const { isChecking, getSelectedData, line, setFieldValue, prompt } = scope;
             
             const s = getSelectedData();
             
             if (isChecking) {
               function askForAutoFill(max) {
        const confirmation = new Promise((resolve, reject) => {
          prompt({
            title: 'Limite máximo ultrapassado',
            type: 'question',
            message: \`Você só poderia selecionar mais \${max} item(s). Deseja corrigir a quantidade?\`,
            onConfirm: () => { resolve(true) },
            onCancel: () => { resolve(false) },
          });
        });
      
        return confirmation;
      }
      
               const selected = getSelectedData()
                 .filter(i => i.itemCode === line.itemCode && i._key !== line._key)
                 .reduce((selectedSoFar, itemB) => parseFloat(selectedSoFar) + parseFloat(itemB.quantity || 0), 0);
                 
             const nextSelection = (selected + (parseFloat(line.quantity) || 0));
             
             
               if (line._requested >= nextSelection) {
                 return true;
               }
               
               const max = parseFloat((line._requested - selected).toFixed(2));
               
               if (max) {
                 const decision = await askForAutoFill(max);
                 
                 if (!decision) return false;
                 
                 setFieldValue('quantity', max);
                 return true;
               }
               
               
               alert('Você atingiu o limite de seleções para este item');
               return false;
             }
            
        "
      },
      {
          "name": "reference",
          "type": "string",
          "title": "Referência"
      },
      {
          "name": "groupNumber",
          "type": "string",
          "title": "Nº do Grupo"
      },
      {
          "name": "mirrorId",
          "type": "string",
          "title": "Espelho"
      },
      {
          "name": "name",
          "type": "string",
          "title": "Nome"
      },
      {
          "name": "email",
          "type": "string",
          "title": "E-mail"
      },
      {
          "name": "supply",
          "type": "link",
          "title": "Fornecedor",
          "onClick": "scope.showPage('BusinessPartners', scope.line.supplyCode);"
      },
      {
          "name": "supplyCode",
          "hiddenDesktop": true,
          "hiddenMobile": true
      },
      {
          "name": "branch",
          "type": "string",
          "title": "Filial"
      },
      {
          "name": "branchId",
          "hiddenDesktop": true,
          "hiddenMobile": true
      },
      {
          "name": "item",
          "type": "link",
          "title": "Item",
          "onClick": "scope.showPage('Items', { itemCode: scope.line.itemCode })"
      },
      {
          "name": "itemCode",
          "hiddenDesktop": true,
          "hiddenMobile": true
      },
      {
          "name": "description",
          "type": "inputText",
          "title": "Descrição"
      },
      {
          "name": "requested",
          "type": "number",
          "title": "Solicitado"
      },
      {
          "name": "quantity",
          "type": "inputNumber",
          "title": "Quantidade",
          "cellStyle": "
              const {value, data} = scope;
              if (parseFloat(value) !== parseFloat(data._quantity)) {
                return { backgroundColor: '#ebf3e7'};
              }
              
              return null;
          ",
          "onChange": "
            const { line, currentValue, selectRow } = scope;
            
            if (parseFloat(line._quantity) !== parseFloat(currentValue)) {
              
              selectRow({force: true});
            }
            
          "
      },
      {
          "name": "_quantity",
          "type": "number",
          "title": "Quantidade",
          "hiddenDesktop": true,
          "hiddenMobile": true
      },
      {
          "name": "lineTotal",
          "type": "number",
          "title": "Total"
      },
      {
          "name": "unit",
          "type": "string",
          "title": "Unidade"
      },
      {
          "name": "unitPrice",
          "type": "number",
          "title": "Preço Unitário"
      },
      {
          "name": "reqDate",
          "type": "date",
          "dataType": "date",
          "title": "Data Necessária"
      },
      {
          "name": "validTo",
          "type": "date",
          "dataType": "date",
          "title": "Válido Até"
      },
      {
          "name": "shipDate",
          "type": "date",
          "dataType": "date",
          "title": "Data de Entrega"
      },
      {
          "name": "purchaseQuotationNumber",
          "type": "link",
          "title": "Oferta de Compra",
          "onClick": "scope.showPage('PurchaseQuotations', scope.line.purchaseQuotationNumber)"
      },
      {
          "name": "purchaseQuotationEntry",
          "hiddenMobile": true,
          "hiddenDesktop": true
      },
      {
          "name": "warehouseCode",
          "hiddenMobile": true,
          "hiddenDesktop": true
      },
      {
          "name": "baseLine",
          "hiddenMobile": true,
          "hiddenDesktop": true
      },
      {
          "name": "purchaseQuotationLine",
          "hiddenMobile": true,
          "hiddenDesktop": true
      }
  ],
  "params": [
      {
          "name": "reference",
          "label": "Referência",
          "type": "string"
      },
      {
          "name": "groupNumber",
          "label": "Nº do Grupo",
          "type": "string"
      },
      {
          "name": "initialDate",
          "label": "Data De",
          "type": "date"
      },
      {
          "name": "finalDate",
          "label": "Data Até",
          "type": "date"
      }
  ]
}
`;

export default settings;
