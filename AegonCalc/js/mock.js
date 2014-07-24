
var clientIdRequest = [
    {
        groupName: "Client Identification",
        formItems: [
            {
                index: 0,
                name: "client_id",
                type: "string",
                value: null,
                list: null,
                label: "Client Id",
                required: true,
                disabled: false,
                hidden: false
            }
        ]
    }
];

var firstRequest = [
    {
        "groupName": "Activity Request",
        "formItems": [
            {
                "index": 0,
                "name": "quota_data",
                "type": "date",
                "value": "2014-07-20T11:31:16.489+0000",
                "list": null,
                "label": "Quotation date",
                "required": true,
                "disabled": false,
                "hidden": false
            }, {
                "index": 1,
                "name": "request_date",
                "type": "date",
                "value": "2014-07-20T11:31:16.489+0000",
                "list": null,
                "label": "Request Date",
                "required": true,
                "disabled": true,
                "hidden": false
            }
        ]
    }, {
        "groupName": "Activity Request",
        "formItems": [
            {
                "index": 0,
                "name": "distrib",
                "type": "string",
                "value": "AP00000003",
                "list": null,
                "label": "Distributor",
                "required": true,
                "disabled": false,
                "hidden": false
            }, {
                "index": 1,
                "name": "product",
                "type": "combobox",
                "value": "product",
                "list": [{
                    "key": "product",
                    "value": "Product"
                }],
                "label": "Product",
                "required": true,
                "disabled": false,
                "hidden": false
            }, {
                "index": 2,
                "name": "product_code",
                "type": "string",
                "value": "21910",
                "list": null,
                "label": "Product Code",
                "required": true,
                "disabled": false,
                "hidden": false
            }
        ]
    }, {
        "groupName": "Proposal",
        "formItems": [{
            "index": 1,
            "name": "proposal_id",
            "type": "string",
            "value": "1321337508",
            "list": null,
            "label": "Proposal ID",
            "required": true,
            "disabled": false,
            "hidden": false
        }]
    }, {
        "groupName": "Owner Information",
        "formItems": [
            {
                "index": 1,
                "name": "owner_type",
                "type": "combobox",
                "value": "person",
                "list": [
                    {
                        "key": "person",
                        "value": "Person"
                    }, {
                        "key": "organization",
                        "value": "Organisation"
                    }
                ],
                "label": "Owner Type",
                "required": true,
                "disabled": false,
                "hidden": false
            }, {
                "index": 2,
                "name": "title",
                "type": "string",
                "value": "Mrs",
                "list": null,
                "label": "Title",
                "required": false,
                "disabled": true,
                "hidden": false
            }, {
                "index": 3,
                "name": "birth_urname",
                "type": "string",
                "value": "POLISH",
                "list": null,
                "label": "Birth Surname",
                "required": false,
                "disabled": true,
                "hidden": false
            }, {
                "index": 4,
                "name": "first_name",
                "type": "string",
                "value": "Polishova",
                "list": null,
                "label": "First name",
                "required": false,
                "disabled": true,
                "hidden": false
            }, {
                "index": 5,
                "name": "date_of_birth",
                "type": "string",
                "value": "1995.06.04.",
                "list": null,
                "label": "Date of Birth",
                "required": false,
                "disabled": true,
                "hidden": false
            }
        ]
    }
];

var secondRequest =[
    {
        "index": 23,
        "name": "occupation",
        "type": "combobox",
        "value": "occup",
        "list": [
            {
                "key": "unoccup",
                "value": "Unoccupied"
            }, {
                "key": "occup",
                "value": "Occupied"
            }
        ],
        "label": "occupation",
        "required": false,
        "disabled": false,
        "hidden": false
    }, {
        "index": 0,
        "name": "insured",
        "type": "string",
        "value": "Polishova POLISH Born On 1995.06.04 - PC unknown",
        "list": null,
        "label": "insured",
        "required": false,
        "disabled": false,
        "hidden": false
    }, {
        "index": 25,
        "name": "prprty_type",
        "type": "combobox",
        "value": "summhouse",
        "list": [
            {
                "key": "garage",
                "value": "Garage"
            }, {
                "key": "summhouse",
                "value": "Summerhouse"
            }, {
                "key": "tpl",
                "value": "Tpl"
            }
        ],
        "label": "prprty_type",
        "required": false,
        "disabled": false,
        "hidden": false
    }, {
        "index": 14,
        "name": "vat_yes_no",
        "type": "boolean",
        "value": "yes",
        "list": null,
        "label": "vat_yes_no",
        "required": false,
        "disabled": false,
        "hidden": false
    }, {
        "index": 1,
        "name": "new_other_prprty",
        "type": "string",
        "value": "[]",
        "list": null,
        "label": "new_other_prprty",
        "required": false,
        "disabled": false,
        "hidden": false
    }, {
        "index": 8,
        "name": "ins_search_enable",
        "type": "string",
        "value": "true",
        "list": null,
        "label": "ins_search_enable",
        "required": false,
        "disabled": false,
        "hidden": false
    }, {
        "index": 9,
        "name": "cntry_code",
        "type": "string",
        "value": "PL",
        "list": null,
        "label": "cntry_code",
        "required": false,
        "disabled": false,
        "hidden": false
    }, {
        "groupName": "Address",
        "index": 2,
        "formItems": [
            {
                "index": 0,
                "name": "zip",
                "type": "string",
                "value": null,
                "list": null,
                "label": "zip",
                "required": false,
                "disabled": false,
                "hidden": false
            }, {
                "index": 1,
                "name": "town",
                "type": "string",
                "value": null,
                "list": null,
                "label": "town",
                "required": false,
                "disabled": false,
                "hidden": false
            }, {
                "index": 3,
                "name": "housenumber",
                "type": "string",
                "value": null,
                "list": null,
                "label": "housenumber",
                "required": false,
                "disabled": false,
                "hidden": false
            }, {
                "index": 8,
                "name": "flat_nmbr",
                "type": "string",
                "value": null,
                "list": null,
                "label": "flat_nmbr",
                "required": false,
                "disabled": false,
                "hidden": false
            }, {
                "index": 2,
                "name": "street",
                "type": "string",
                "value": null,
                "list": null,
                "label": "street",
                "required": false,
                "disabled": false,
                "hidden": false
            }, {
                "index": 6,
                "name": "district",
                "type": "string",
                "value": null,
                "list": null,
                "label": "district",
                "required": false,
                "disabled": false,
                "hidden": false
            }, {
                "index": 4,
                "name": "str_type",
                "type": "string",
                "value": null,
                "list": null,
                "label": "str_type",
                "required": false,
                "disabled": false,
                "hidden": false
            }, {
                "index": 5,
                "name": "community",
                "type": "string",
                "value": null,
                "list": null,
                "label": "community",
                "required": false,
                "disabled": false,
                "hidden": false
            }, {
                "index": 7,
                "name": "vvship",
                "type": "string",
                "value": null,
                "list": null,
                "label": "vvship",
                "required": false,
                "disabled": false,
                "hidden": false
            }
        ]
    }, {
        "index": 7,
        "name": "business_yes_no",
        "type": "boolean",
        "value": "no",
        "list": null,
        "label": "business_yes_no",
        "required": false,
        "disabled": false,
        "hidden": false
    }, {
        "index": 12,
        "name": "product",
        "type": "string",
        "value": "$header:cd_product$FbX",
        "list": null,
        "label": "product",
        "required": false,
        "disabled": false,
        "hidden": false
    }, {
        "index": 5,
        "name": "business_usage",
        "type": "string",
        "value": "no",
        "list": null,
        "label": "business_usage",
        "required": false,
        "disabled": false,
        "hidden": false
    }, {
        "index": 27,
        "name": "community",
        "type": "string",
        "value": null,
        "list": null,
        "label": "community",
        "required": false,
        "disabled": false,
        "hidden": false
    }, {
        "index": 29,
        "name": "vvship",
        "type": "string",
        "value": null,
        "list": null,
        "label": "vvship",
        "required": false,
        "disabled": false,
        "hidden": false
    }, {
        "index": 22,
        "name": "ownership",
        "type": "combobox",
        "value": "owner",
        "list": [
            {
                "key": "co_owner",
                "value": "Co-owner"
            }, {
                "key": "owner",
                "value": "Owner"
            }, {
                "key": "cooprtv",
                "value": "Cooperative right"
            }, {
                "key": "prptl",
                "value": "Perpetual usufruct"
            }, {
                "key": "lease",
                "value": "Lease contract"
            }
        ],
        "label": "ownership",
        "required": false,
        "disabled": false,
        "hidden": false
    }, {
        "index": 21,
        "name": "bldng_type",
        "type": "combobox",
        "value": "house",
        "list": [
            {
                "key": "flt",
                "value": "Flat"
            }, {
                "key": "house",
                "value": "House"
            }
        ],
        "label": "bldng_type",
        "required": false,
        "disabled": false,
        "hidden": false
    }, {
        "index": 30,
        "name": "flat_nmbr",
        "type": "string",
        "value": null,
        "list": null,
        "label": "flat_nmbr",
        "required": false,
        "disabled": false,
        "hidden": false
    }, {
        "index": 4,
        "name": "person",
        "type": "string",
        "value": "Polishova POLISH Born On 1995.06.04 - PC unknown",
        "list": null,
        "label": "person",
        "required": false,
        "disabled": false,
        "hidden": false
    }, {
        "index": 28,
        "name": "district",
        "type": "string",
        "value": null,
        "list": null,
        "label": "district",
        "required": false,
        "disabled": false,
        "hidden": false
    }, {
        "index": 6,
        "name": "flammable",
        "type": "string",
        "value": "no",
        "list": null,
        "label": "flammable",
        "required": false,
        "disabled": false,
        "hidden": false
    }, {
        "index": 26,
        "name": "str_type",
        "type": "combobox",
        "value": null,
        "list": [
            {
                "key": "al",
                "value": "al."
            }, {
                "key": "ul",
                "value": "ul."
            }, {
                "key": "os",
                "value": "os."
            }, {
                "key": "pl",
                "value": "pl."
            }
        ],
        "label": "str_type",
        "required": false,
        "disabled": false,
        "hidden": false
    }, {
        "index": 24,
        "name": "operation",
        "type": "combobox",
        "value": "under_op",
        "list": [
            {
                "key": "under_con",
                "value": "Under construction"
            }, {
                "key": "under_op",
                "value": "Under operation"
            }
        ],
        "label": "operation",
        "required": false,
        "disabled": false,
        "hidden": false
    }
];