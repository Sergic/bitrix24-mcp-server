reate a new CRM entity crm.item.add
Scope: crm

Who can execute the method: any user with the "add" access permission for the CRM object

This method is a universal way to create objects in CRM. With it, you can create various types of objects, such as deals, contacts, companies, and others.

To create an object, you need to pass the appropriate parameters, including the object type and its information: title, description, contact details, and other specifics.

After a successful request, a new object is created.

This method provides a flexible way to automate the process of creating objects and integrate CRM with other systems.

When creating an entity, a standard series of checks, modifications, and automatic actions are performed:

access permissions are checked
required fields are validated
required fields dependent on stages are validated
field values are checked for correctness
default values are assigned to fields
automation rules are triggered after saving
Next, we will look in detail at how to use this method and what parameters need to be passed.

Method Parameters
Required parameters are marked with *

Name
type

Description

entityTypeId*
integer

Identifier of the system or user-defined type whose element we want to create

fields*
object

Object format.

{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}

where

field_n — field name
value_n — field value
Each CRM entity type has its own set of fields. This means that the set of fields for creating a Lead does not have to match the set of fields for creating a Contact or SPA.

The list of available fields for each entity type is described below.

An incorrect field in fields will be ignored

useOriginalUfNames
boolean

Parameter to control the format of custom field names in the request and response.
Possible values:

Y — original names of custom fields, for example UF_CRM_2_1639669411830
N — custom field names in camelCase, for example ufCrm2_1639669411830
Default is N

Parameter fields
Required parameters are marked with *

CRM object identifier entityTypeId: 1

Name
type

Description

title
string

Title of the entity.

By default, it is generated using the template {entityTypeName} #{id}, where

entityTypeName — name of the entity
id — identifier of the element
For example, for a lead with id = 13 — 'Lead #13'

honorific
crm_status

String identifier of the lead's honorific (for example, 'HNR_RU_1' = 'Mr.').

The list of available honorifics can be obtained using crm.status.list with the filter { ENTITY_ID: "HONOFIRIC" }.

Default is null

name
string

First name.

Default is null

secondName
string

Middle name.

Default is null

lastName
string

Last name.

Default is null

birthdate
date

Date of birth.

Default is null

companyTitle
string

Company name.

Default is null

sourceId
crm_status

String identifier of the source.

For example, 'CALL' = 'Call'.

The list of available sources can be obtained using crm.status.list with the filter { ENTITY_ID: "SOURCE" }.

Default is the first available source

sourceDescription
text

Additional information about the source.

Default is null

stageId
crm_status

String identifier of the entity's stage.

For example, 'NEW' = 'Unprocessed'.

The list of available stages can be obtained using crm.status.list with the filter { ENTITY_ID: "STATUS" }

Default is the first available stage

statusDescription
text

Additional information about the stage.

Default is null

post
string

Position.

Default is null

currencyId
crm_currency

Identifier of the entity's currency.

Default is the default currency

isManualOpportunity
boolean

Mode of calculating the amount. Possible values:

Y — manual
N — automatic
Default is N

opportunity
double

Amount.

Default is null

opened
boolean

Is the entity available to everyone? Possible values:

Y — yes
N — no
Default is Y. The default value can be changed in CRM settings

comments
text

Comment.

Default is null

assignedById
user

Identifier of the user responsible for the entity.

Default is the identifier of the user calling the method

companyId
crm_company

Identifier of the company linked to the entity.

The list of companies can be obtained using the method crm.item.list with entityTypeId = 4.

Default is null

contactId
crm_contact

Identifier of the contact linked to the entity.

The list of contacts can be obtained using the method crm.item.list with entityTypeId = 3.

Default is null

contactIds
crm_contact[]

List of identifiers of contacts linked to the entity.

The list of contacts can be obtained using the method crm.item.list with entityTypeId = 3.

Default is null

originatorId
string

External source.

Default is null

originId
string

Identifier of the entity in the external source.

Default is null

webformId
integer

Identifier of the CRM Form.

Default is null

observers
user[]

Array of user identifiers who will be Observers in the entity.

Default is null

utmSource
string

Advertising system. For example: Google Ads, Facebook Ads, and others.

Default is null

utmMedium
string

Type of traffic. Possible values:

CPC — ads
CPM — banners
Default is null

utmCampaign
string

Identifier of the advertising campaign.

Default is null

utmContent
string

Content of the campaign. For example, for contextual ads.

Default is null

utmTerm
string

Search term of the campaign. For example, keywords for contextual advertising.

Default is null

ufCrm...
crm_userfield

Custom field.

Read about custom fields in the section Custom Fields in CRM

Values of multiple fields are passed as an array.

To upload a file, the value of the custom field must be an array where the first element is the file name and the second is the content of the file encoded in base64.

parentId...
crm_entity

Parent field. An element of another type of CRM object linked to this element.

Each such field has the code parentId + {parentEntityTypeId}

fm
multifield[]

Array of multifields.

More about multifields can be read in the section {#T}

Structure of a multifield:

typeId — Type of multifield
valueType — Type of value
value — Value
Example:

fm: [
  {
    "valueType": "WORK",
    "value": "+19999999999",
    "typeId": "PHONE"
  },
  {
    "valueType": "WORK",
    "value": "bitrix@bitrix.com",
    "typeId": "EMAIL"
  }
]

Default is null











































































































































































































































































































































































































































































































































































































































































































































































Code Examples
How to Use Examples in Documentation

Example of creating a deal

curl -X POST \
-H "Content-Type: application/json" \
-H "Accept: application/json" \
-d '{"entityTypeId":2,"fields":{"title":"New deal (specifically for the REST methods example)","typeId":"SERVICE","categoryId":9,"stageId":"C9:UC_KN8KFI","isReccurring":"Y","probability":50,"currencyId":"USD","isManualOpportunity":"Y","opportunity":999.99,"taxValue":99.9,"companyId":5,"contactId":4,"contactIds":[4,5],"quoteId":7,"begindate":"formatDate(monthAgo)","closedate":"formatDate(twelveDaysInAdvance)","opened":"N","comments":"commentsExample","assignedById":6,"sourceId":"WEB","sourceDescription":"There should be additional description about the source","leadId":102,"additionalInfo":"There should be additional information","observers":[2,3],"utmSource":"google","utmMedium":"CPC","ufCrm_1721244707107":1111.1,"parentId1220":[1,2]}}' \
https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.item.add

Example of creating an SPA item with a set of custom fields

curl -X POST \
-H "Content-Type: application/json" \
-H "Accept: application/json" \
-d '{
    "entityTypeId": 1302,
    "fields": {
        "ufCrm44_1721812760630": "String for custom field of type String",
        "ufCrm44_1721812814433": 81,
        "ufCrm44_1721812853419": "'"$(date '+%Y-%m-%d')"'",
        "ufCrm44_1721812885588": [
            "example.com",
            "second-example.com"
        ],
        "ufCrm44_1721812898903": [
            "green_pixel.png",
            "iVBORw0KGgoAAAANSUhEUgAAAIAAAAAMCAYAAACqTLVoAAAALklEQVR42u3SAQEAAAQDsEsuOj3YMqwy6fBWCSCAAAIgAAIgAAIgAAIgAAJw3QLOrRH1U/gU4gAAAABJRU5ErkJggg=="
        ],
        "ufCrm44_1721812915476": "300|USD",
        "ufCrm44_1721812935209": "Y",
        "ufCrm44_1721812948498": 9999.9
    }
}' \
https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.item.add

Response Processing
HTTP Status: 200

{
    "result": {
        "item": {
            "id": 342,
            "createdTime": "2024-07-18T14:00:14+02:00",
            "dateCreateShort": null,
            "updatedTime": "2024-07-18T14:00:14+02:00",
            "dateModifyShort": null,
            "createdBy": 1,
            "updatedBy": 1,
            "assignedById": 6,
            "opened": "N",
            "leadId": 102,
            "companyId": 5,
            "contactId": 4,
            "quoteId": 7,
            "title": "New deal (specifically for the example of REST methods)",
            "productId": null,
            "categoryId": 9,
            "stageId": "C9:UC_KN8KFI",
            "stageSemanticId": "P",
            "isNew": "N",
            "isRecurring": "N",
            "isReturnCustomer": "N",
            "isRepeatedApproach": "Y",
            "closed": "N",
            "typeId": "SERVICE",
            "opportunity": 999.99,
            "isManualOpportunity": "Y",
            "taxValue": 0,
            "currencyId": "USD",
            "probability": 50,
            "comments": "\nExample comment within the deal\n\n[B]Bold text[/B]\n[I]Italic[/I]\n[U]Underlined[/U]\n[S]Strikethrough[/S]\n[B][I][U][S]Mix[/S][/U][/I][/B]\n\n[LIST]\n[*]List item #1\n[*]List item #2\n[*]List item #3\n[/LIST]\n\n[LIST=1]\n[*]Numbered list item #1\n[*]Numbered list item #2\n[*]Numbered list item #3\n[/LIST]\n",
            "begindate": "2024-06-18T02:00:00+02:00",
            "begindateShort": null,
            "closedate": "2024-07-30T02:00:00+02:00",
            "closedateShort": null,
            "eventDate": null,
            "eventDateShort": null,
            "eventId": null,
            "eventDescription": null,
            "locationId": null,
            "webformId": null,
            "sourceId": "WEB",
            "sourceDescription": "There should be additional description about the source",
            "originatorId": null,
            "originId": null,
            "additionalInfo": "There should be additional information",
            "searchContent": null,
            "orderStage": null,
            "movedBy": 1,
            "movedTime": "2024-07-18T14:00:14+02:00",
            "lastActivityBy": 1,
            "lastActivityTime": "2024-07-18T14:00:14+02:00",
            "isWork": null,
            "isWon": null,
            "isLose": null,
            "receivedAmount": null,
            "lostAmount": null,
            "hasProducts": null,
            "ufCrm_1721244707107": 1111.1,
            "parentId1220": [
                "1",
                "2"
            ],
            "utmSource": "google",
            "utmMedium": "CPC",
            "utmCampaign": null,
            "utmContent": null,
            "utmTerm": null,
            "observers": [
                2,
                3
            ],
            "contactIds": [
                4,
                5
            ],
            "entityTypeId": 2
        }
    },
    "time": {
        "start": 1721304013.245896,
        "finish": 1721304015.555471,
        "duration": 2.309574842453003,
        "processing": 1.8328988552093506,
        "date_start": "2024-07-18T14:00:13+02:00",
        "date_finish": "2024-07-18T14:00:15+02:00",
        "operating": 1.8328571319580078
    }
}

Returned Data
Name
type

Description

result
object

The root element of the response, contains a single key item

item
item

Information about the created item

time
time

Information about the request execution time

Item Object
Note

Disabled fields always return null

Name
type

Description

id
integer

Identifier of the item

createdTime
datetime

Time of item creation

dateCreateShort
datetime

Time of item creation (short format).

Field is disabled

updatedTime
datetime

Time of last modification of the item

dateModifyShort
datetime

Time of last modification of the item (short format).

Field is disabled

createdBy
user

Identifier of the user who created the item

updatedBy
user

Identifier of the user who modified the item

assignedById
user

Identifier of the user responsible for the item

opened
boolean

Is the item open?

companyId
crm_company

Identifier of the company associated with the item

contactId
crm_contact

Identifier of the contact associated with the item

stageId
crm_status

String identifier of the item's stage

isConvert
boolean

Has the lead been converted?

Field is disabled

statusDescription
text

Additional information about the stage

stageSemanticId
string

Group of the stage. Possible values:

P — in progress
S — successful
F — unsuccessful
productId
string

Identifier of the product.

Deprecated.

Field is disabled

opportunity
double

Amount

currencyId
crm_currency

Identifier of the item's currency

sourceId
crm_status

String identifier of the source type

sourceDescription
text

Additional information about the source

title
string

Title of the item

name
string

First name

lastName
string

Last name

secondName
string

Middle name

shortName
string

Last name First name.

Short format: for example 'Ivanov Ivan' -> 'Ivanov I.'.

Field is disabled

companyTitle
string

Company name

post
string

Position

address
text

Address.

Deprecated.

Field is disabled

comments
text

Comment

webformId
integer

Identifier of the CRM form

originatorId
string

External source

originId
string

Identifier of the item in the external source

dateClosed
datetime

Time of item closure

birthdate
date

Date of birth

honorific
crm_status

String identifier of the type of address

hasPhone
boolean

Does the item have a phone?

hasEmail
boolean

Does the item have an email?

hasImol
boolean

Does the item have open channels?

login
string

Login.

Deprecated.

Field is disabled

isReturnCustomer
boolean

Is the item a repeat customer?

searchContent
text

Information for full-text search.

Service field

isManualOpportunity
boolean

Is manual mode for calculating the amount set?

movedBy
user

Identifier of the user who last changed the stage

movedTime
datetime

Time of the last stage change

lastActivityBy
user

Identifier of the user who last showed activity in the timeline

lastActivityTime
datetime

Time of the last activity in the timeline

phoneMobile
string

Mobile phone

phoneWork
string

Work phone

phoneMailing
string

Phone for mailing

emailHome
string

Personal E-mail

emailWork
string

Work E-mail

emailMailing
string

Mailing email

skype
string

Skype

icq
string

ICQ

imol
string

IMOL

email
string

E-mail

phone
string

Phone

utmSource
string

Advertising system. Google-Adwords and others

utmMedium
string

Type of traffic. Possible values:

CPC — ads
CPM — banners
utmCampaign
string

Identifier of the advertising campaign

utmContent
string

Content of the campaign.

For example, for contextual ads

utmTerm
string

Search condition of the campaign.

For example, keywords of contextual advertising

observers
user[]

List of user identifiers who are Observers

contactIds
crm_contact[]

List of contact identifiers associated with the item

entityTypeId
integer

Identifier of the entity type

ufCrm...
crm_userfield

User field. See the section Custom Fields in CRM.

Values of multiple fields are returned as an array
The value of the file type field is returned as an object:
id — identifier
url — link to the file on the account
urlMachine — link to the file for the application
parentId...
crm_entity

Parent field. An element of another type of CRM object that is linked to this element.

Each such field has the code parentId + {parentEntityTypeId}

fm
multifield

Array of multifields.

More about multifields can be read in the section {#T}

Structure of a multifield:

id — Unique identifier
typeId — Type of multifield
valueType — Type of value
value — Value




















































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































By default, names of user-defined fields are passed and returned in camelCase, for example ufCrm2_1639669411830.
When passing the parameter useOriginalUfNames with the value Y, user-defined fields will be returned with their original names, for example UF_CRM_2_1639669411830.

Error Handling
HTTP status: 400, 403

{
    "error": "NOT_FOUND",
    "error_description": "SPA not found"
}

Name
type

Description

error
string

String error code. It may consist of digits, Latin letters, and underscores

error_description
error_description

Textual description of the error. The description is not intended to be shown to the end user in its raw form

Possible Error Codes
Status

Code

Description

Value

403

allowed_only_intranet_user

Action allowed only for intranet users

User is not an intranet user

400

NOT_FOUND

SPA not found

Occurs when an invalid entityTypeId is passed

400

ACCESS_DENIED

Access denied

User does not have permission to add items of type entityTypeId

400

CRM_FIELD_ERROR_VALUE_NOT_VALID

Invalid value for field "field"

Incorrect value for field field

400

100

Expected iterable value for multiple field, but got type instead

One of the multiple fields received a value of type type, while an iterable type was expected

400

CREATE_DYNAMIC_ITEM_RESTRICTED

You cannot create a new item due to your plan restrictions

Plan restrictions do not allow creating SPA items

Statuses and System Error Codes
HTTP status: 20x, 40x, 50x

The errors described below may occur when calling any method.

Status

Code
Error Message

Description

500

INTERNAL_SERVER_ERROR
Internal server error

An internal server error has occurred.

500

ERROR_UNEXPECTED_ANSWER
Server returned an unexpected response

An internal server error has occurred.

503

QUERY_LIMIT_EXCEEDED
Too many requests

The request intensity limit has been exceeded.

405

ERROR_BATCH_METHOD_NOT_ALLOWED
Method is not allowed for batch usage

The current method is not allowed to be called using batch.

400

ERROR_BATCH_LENGTH_EXCEEDED
Max batch length exceeded

The maximum length of parameters passed to the batch method has been exceeded.

401

NO_AUTH_FOUND
Wrong authorization data

Invalid access token or webhook code.

400

INVALID_REQUEST
Https required.

The HTTPS protocol is required for calling REST methods.

503

OVERLOAD_LIMIT
REST API is blocked due to overload

The REST API is blocked due to overload. This is a manual individual block; to remove it, you need to contact Bitrix24 technical support.

403

ACCESS_DENIED
REST API is available only on commercial plans

The REST API is available only on commercial plans.

403

INVALID_CREDENTIALS
Invalid request credentials

The user whose access token or webhook was used to call the method lacks permissions.

404

ERROR_MANIFEST_IS_NOT_AVAILABLE
Manifest is not available.

The manifest is not available.

403

insufficient_scope
The request requires higher privileges than provided by the webhook token

The request requires higher privileges than those provided by the webhook token.

401

expired_token
The access token provided has expired

The provided access token has expired.

403

user_access_error
The user does not have access to the application

The user does not have access to the application. This means that the application is installed, but the account administrator has granted access to this application only to specific users.

Continue Learning
Update CRM Item: crm.item.update
Get an item by Id crm.item.get
Get a list of crm.item.list elements
Delete CRM Item
Get Fields of CRM Item `crm.item.fields`
Previous
Get fields of custom type
Next
Update Entity



Timeline and Activities in CRM: Overview of Methods
The timeline is the primary workspace in the CRM entity detail form. It records:

System information about working with the entity: stage changes, payments, creation of entities based on the current one
User information: CRM activities (tasks, e-mails, calls) and timeline entries (comments, documents generated from templates, application log entries)
Quick navigation: all methods and events

User documentation: timeline in Bitrix24, universal activity in Bitrix24

Activities
Activities in CRM are divided into incoming and scheduled:

Incoming — activities received from the client, such as an e-mail or a call. For these activities, it is important to correctly specify the DIRECTION parameter = 1 so that the incoming CRM activities counter works
Scheduled — activities created by employees, such as tasks or universal activities
More details about activities and methods for managing them can be found in the article Activities in CRM: Overview of Methods.

Timeline
Timeline entries are divided into two types:

Comments. You can add, delete, modify, and retrieve comments through the group of methods crm.timeline.comment.*
Log entries. You can add, delete, modify, and retrieve log entries through the group of methods crm.timeline.logmessage.*
You can manage the relationships of timeline entries with CRM entities using the methods from the group crm.timeline.bindings.*

Widgets
You can embed an application into activities and timeline entries. Thanks to the embedding, you will be able to use the application without leaving the CRM entity detail form. For embedding, there are special places in the timeline:

Button above the timeline of the entity detail form CRM_XXX_DETAIL_ACTIVITY, CRM_DYNAMIC_XXX_DETAIL_ACTIVITY
Context menu item of the activity in the entity detail form CRM_XXX_ACTIVITY_TIMELINE_MENU
Typical use-cases and scenarios

Widget embedding mechanism
Create activities from applications
Additional Features
Text notes can be added to activities and timeline comments and deleted. Use the group of methods crm.timeline.note.*.

Content blocks can be added to timeline comments and deleted. Use the group of methods crm.timeline.layout.blocks.*.

Available content blocks
Overview of Methods and Events
Scope: crm

Who can execute methods: depending on the method

Timeline Comments
Method

Description

crm.timeline.comment.add

Adds a new comment to the timeline

crm.timeline.comment.update

Updates a comment

crm.timeline.comment.get

Retrieves information about a comment

crm.timeline.comment.list

Retrieves a list of all comments for the CRM entity

crm.timeline.comment.delete

Deletes a comment

crm.timeline.comment.fields

Retrieves a list of timeline comment fields









Notes for Timeline Entry
Method

Description

crm.timeline.note.get

Retrieves information about a note

crm.timeline.note.save

Saves a note

crm.timeline.note.delete

Deletes a note

Managing Timeline Entry Relationships
Method

Description

crm.timeline.bindings.bind

Adds a relationship between a timeline entry and a CRM entity

crm.timeline.bindings.list

Retrieves a list of relationships for a timeline entry

crm.timeline.bindings.unbind

Removes a relationship between a timeline entry and a CRM entity

crm.timeline.bindings.fields

Retrieves fields of the relationship between CRM entities and timeline entries

Additional Content Blocks
Method

Description

crm.timeline.layout.blocks.set

Sets a set of additional content blocks in the timeline entry

crm.timeline.layout.blocks.get

Retrieves the set of additional content blocks installed by the application for the timeline entry

crm.timeline.layout.blocks.delete

Deletes the set of additional content blocks installed by the application for the timeline entry

Application Log Entry Journal
Method

Description

crm.timeline.logmessage.add

Adds a new log entry to the timeline

crm.timeline.logmessage.get

Retrieves information about a log entry

crm.timeline.logmessage.list

Retrieves a list of all log entries for a specific entity

crm.timeline.logmessage.delete

Deletes a log entry

crm.timeline.icon.*

Manages entry icons

crm.timeline.logo.*

Manages entry logos

Activities in CRM: Overview of Methods
In CRM, activities are used for any tasks related to clients: calls, meetings, document approvals.

Activities are divided into incoming and scheduled:

Incoming — activities that come from the client, such as an email, call, or chat. For these activities, it is important to correctly specify the parameter DIRECTION = 1 so that the incoming activities counter in CRM works.

Scheduled — activities created by employees, such as tasks or universal activities. They can have a deadline, add links to CRM entities, integrate with the calendar, invite colleagues, and attach files.

Quick navigation: all methods and events

User documentation: activities in CRM, Activity Direction

Links of Activities with Other CRM Entities
Activities linked to CRM entities are stored in the timeline of the entity's card. If an activity is linked to multiple entities — for example, an email can be linked to both a deal and a contact — it will be stored in the timelines of all related entities.

Links between activities and CRM entities can be added and removed using the methods from the crm.activity.binding.* group.

System Activities
System activities in CRM are created automatically:

A call activity is created by the connected telephony in Bitrix. To finish a call, use the method telephony.externalcall.finish. This method ends the call, creates an activity in the entity's card, and returns the ID of the created activity in the parameter CRM_ACTIVITY_ID.

An email activity is created by the email system. When an email from a client arrives at the connected Bitrix24 address, CRM checks if there is a client in the database with the email from the message. Based on the results of the check, an activity will be created in the card of the found entity or a new client, where the activity will appear.

To create, modify, or delete a system activity, use the methods from the crm.activity.* group. When creating a system activity, specify TYPE_ID, for example, for an email activity TYPE_ID = 2. To get values for other types of activities, use the method crm.enum.activitytype.

Custom Activity Types
Applications can register custom activity types: upload a custom icon and specify the type name. For example, you can create your own activity type with an icon and name of your application.

To register an activity type — use the methods from the crm.activity.type.* group. When creating a type, you need to specify its code designation in the parameter TYPE_ID.

To create an activity with the application type — use the group of system activity methods crm.activity.add. When creating an activity, specify the code designation of the custom type TYPE_ID, registered for the activity type, in the parameter PROVIDER_TYPE_ID.

The methods crm.activity.delete (deletes an activity) and crm.activity.list (retrieves a list of activities) are common for all types of CRM activities.

Universal Activities
Universal activities are a type of activity with extended settings. In the card of a universal activity, you can synchronize the activity with the calendar, choose a meeting location with the client, add colleagues, select a client from a CRM entity, categorize activities by color, and choose a meeting room. Extended settings are available to employees on the Bitrix24 side.

To create a universal activity, use the method crm.activity.todo.add. To change the deadline of the activity — use the method crm.activity.todo.updateDeadline, and to change the description of the activity — crm.activity.todo.updateDescription.

User Documentation

Universal Activity in Bitrix24
Configurable Activities
Configurable activities are a type of activity that can only be created from an application. For this type, you can customize the appearance of the activity card and its functionality:

Structure of Configurable Activity
Badges of Configurable Activity
To create or modify a configurable activity, use the methods from the crm.activity.configurable.* group.

Widgets
Applications can be embedded into activities. For embedding, special places are used, and there is one available in activities — Context Menu Item of the Activity in the Entity Card CRM_XXX_ACTIVITY_TIMELINE_MENU.

Thanks to the embedding, you can use the application without leaving the entity card. The application will open on the page you specify during the registration of the embedding.

Typical use-cases and scenarios

Widget Embedding Mechanism
Create Activities from Applications
Additional Features
Text notes can be added to activities and deleted. Use the methods from the crm.timeline.note.* group.

Content blocks can be added to activities and deleted. Use the methods from the crm.activity.layout.blocks.*.

Available Content Blocks
Overview of Methods and Events
Scope: crm

Who can perform methods: any user

General Methods and Events
Method

Description

crm.activity.add

Creates a new activity

crm.activity.update

Updates an activity

crm.activity.get

Returns an activity by ID

crm.activity.list

Returns a list of activities of all types by filter

crm.activity.delete

Deletes any type of activity

crm.activity.fields

Returns the description of activity fields

crm.activity.communication.fields

Returns the description of communication fields









Managing Activity Links
Method

Description

crm.activity.binding.add

Adds a link

crm.activity.binding.list

Returns a list of links

crm.activity.binding.delete

Deletes a link

Custom Activity Types
Method

Description

crm.activity.type.add

Registers a custom activity type with a name and icon

crm.activity.type.list

Retrieves a list of activities

crm.activity.type.delete

Deletes a custom type

Universal Activity
Method

Description

crm.activity.todo.add

Creates a universal activity

crm.activity.todo.updateDeadline

Changes the deadline

crm.activity.todo.updateDescription

Changes the description

Configurable Activity
Method

Description

crm.activity.configurable.add

Adds a new configurable activity to the timeline

crm.activity.configurable.update

Updates a configurable activity

crm.activity.configurable.get

Retrieves information about an activity by ID

Badges of Configurable Activity
Method

Description

crm.activity.badge.add

Creates a badge

crm.activity.badge.get

Returns information about a badge

crm.activity.badge.list

Returns a list of all registered badges

crm.activity.badge.delete

Deletes a badge

Additional Content Blocks
Method

Description

crm.activity.layout.blocks.set

Sets a set of additional content blocks in the activity

crm.activity.layout.blocks.get

Retrieves the set of additional content blocks in the activity set by the application

crm.activity.layout.blocks.delete

Deletes the set of additional content blocks for the activity set by the application

Previous
Overview of Methods
Next
Overview of Methods

Timeline and Activities in CRM: Overview of Methods
The timeline is the primary workspace in the CRM entity detail form. It records:

System information about working with the entity: stage changes, payments, creation of entities based on the current one
User information: CRM activities (tasks, e-mails, calls) and timeline entries (comments, documents generated from templates, application log entries)
Quick navigation: all methods and events

User documentation: timeline in Bitrix24, universal activity in Bitrix24

Activities
Activities in CRM are divided into incoming and scheduled:

Incoming — activities received from the client, such as an e-mail or a call. For these activities, it is important to correctly specify the DIRECTION parameter = 1 so that the incoming CRM activities counter works
Scheduled — activities created by employees, such as tasks or universal activities
More details about activities and methods for managing them can be found in the article Activities in CRM: Overview of Methods.

Timeline
Timeline entries are divided into two types:

Comments. You can add, delete, modify, and retrieve comments through the group of methods crm.timeline.comment.*
Log entries. You can add, delete, modify, and retrieve log entries through the group of methods crm.timeline.logmessage.*
You can manage the relationships of timeline entries with CRM entities using the methods from the group crm.timeline.bindings.*

Widgets
You can embed an application into activities and timeline entries. Thanks to the embedding, you will be able to use the application without leaving the CRM entity detail form. For embedding, there are special places in the timeline:

Button above the timeline of the entity detail form CRM_XXX_DETAIL_ACTIVITY, CRM_DYNAMIC_XXX_DETAIL_ACTIVITY
Context menu item of the activity in the entity detail form CRM_XXX_ACTIVITY_TIMELINE_MENU
Typical use-cases and scenarios

Widget embedding mechanism
Create activities from applications
Additional Features
Text notes can be added to activities and timeline comments and deleted. Use the group of methods crm.timeline.note.*.

Content blocks can be added to timeline comments and deleted. Use the group of methods crm.timeline.layout.blocks.*.

Available content blocks
Overview of Methods and Events
Scope: crm

Who can execute methods: depending on the method

Timeline Comments
Method

Description

crm.timeline.comment.add

Adds a new comment to the timeline

crm.timeline.comment.update

Updates a comment

crm.timeline.comment.get

Retrieves information about a comment

crm.timeline.comment.list

Retrieves a list of all comments for the CRM entity

crm.timeline.comment.delete

Deletes a comment

crm.timeline.comment.fields

Retrieves a list of timeline comment fields









Notes for Timeline Entry
Method

Description

crm.timeline.note.get

Retrieves information about a note

crm.timeline.note.save

Saves a note

crm.timeline.note.delete

Deletes a note

Managing Timeline Entry Relationships
Method

Description

crm.timeline.bindings.bind

Adds a relationship between a timeline entry and a CRM entity

crm.timeline.bindings.list

Retrieves a list of relationships for a timeline entry

crm.timeline.bindings.unbind

Removes a relationship between a timeline entry and a CRM entity

crm.timeline.bindings.fields

Retrieves fields of the relationship between CRM entities and timeline entries

Additional Content Blocks
Method

Description

crm.timeline.layout.blocks.set

Sets a set of additional content blocks in the timeline entry

crm.timeline.layout.blocks.get

Retrieves the set of additional content blocks installed by the application for the timeline entry

crm.timeline.layout.blocks.delete

Deletes the set of additional content blocks installed by the application for the timeline entry

Application Log Entry Journal
Method

Description

crm.timeline.logmessage.add

Adds a new log entry to the timeline

crm.timeline.logmessage.get

Retrieves information about a log entry

crm.timeline.logmessage.list

Retrieves a list of all log entries for a specific entity

crm.timeline.logmessage.delete

Deletes a log entry

crm.timeline.icon.*

Manages entry icons

crm.timeline.logo.*

Manages entry logos

Tasks: Overview of Methods
Tasks in Bitrix24 are a unified space that helps organize team work: assigning small tasks and managing large projects. In tasks, you can track the progress of employees, control deadlines, and distribute responsibilities.

Quick navigation: all methods and events

User documentation: Bitrix24 tasks

Features of Task REST Methods
In the REST methods for tasks, it is important to follow the order of parameters in the request as specified in the parameter tables. Otherwise, the request will execute with errors.

Task Card
The task card can be divided into blocks:

description
system and custom fields
comments, history, and time tracking
The task description contains information about what needs to be done. You can add checklists, files, and links to other tasks to the text.

Checklists help create a list of steps for completing the task. You can manage checklists using the group of methods task.checklistitem.*.

Create links to tasks using the method task.dependence.add. Delete them using the method task.dependence.delete.

When creating a task, fill in the system fields: specify the assignee, watchers, deadline, tags, and so on.

If the system fields are not enough, you can create your own custom fields. They allow you to store information in various data formats: string, number, date with time, and yes/no. You can create, modify, retrieve, or delete custom task fields using the group of methods task.item.userfield.*.

In the comments, discuss the task and write about the results of the work. Use the group of methods task.commentitem.* to work with comments.

The results of the work on the task can be recorded in a comment and fixed as a result. Manage task results using the group of methods tasks.task.result.*.

Time tracking in tasks monitors the time spent by an employee on a task. You can work with time tracking records using the group of methods task.elapseditem.*.

All actions with the task are recorded and saved in the task history. To retrieve the history, use the method tasks.task.history.list.

User Documentation

How to create a task
Checklists in tasks
Time tracking in tasks
Additional task features
Linking Tasks with Other Objects
Parent Task. A task can have subtasks. In this case, it is considered a parent task. You can add a link to the parent task in the PARENT_ID parameter. You can obtain the task ID using the method for creating a task or getting a list of tasks.

Group or Project. A task is linked by the group ID GROUP_ID. You can obtain the ID using the method for creating a new group or the method for getting a list of groups.

User. A task is linked to users by numerical IDs in the fields:

CREATED_BY — creator
RESPONSIBLE_ID — assignee
ACCOMPLICES — participants
AUDITORS — watchers
CHANGED_BY — last user who modified the task
STATUS_CHANGED_BY — last user who changed the task status
CLOSED_BY — user who completed the task
You can obtain the user ID using the method user.get.

CRM. You can link CRM objects to the task: contacts, companies, leads, deals, invoices, and SPAs. To link an object, specify its identifier with a prefix in the UF_CRM_TASK parameter. For example, C_3 for a contact with id = 3. You can obtain the identifier using the method for creating a new CRM item or the method for getting a list of items.

Email. A task can be linked to an email by its identifier through the UF_MAIL_MESSAGE parameter.

User Documentation

How to create a subtask
How to create a group and project
Drive Files
You can attach Drive files to the task description. In the UF_TASK_WEBDAV_FILES parameter, pass an array with the identifiers of the Drive files. Precede each identifier with the prefix n, for example: "UF_TASK_WEBDAV_FILES": ["n428", "n345"]. You can obtain file identifiers in two ways.

Use one of the file upload methods:

disk.storage.uploadfile
disk.folder.uploadfile
Use one of the methods to get a list of files:

disk.storage.getchildren
disk.folder.getchildren
Attach files to the task using the method tasks.task.files.attach if the task has already been created.

Typical use-cases and scenarios

How to Create a Task with an Attached File
How to Upload a File to a Task
Flows
Flows are a tool that automates the distribution and execution of tasks. Employees do not need to search for who will do the task. They place tasks in the department flow, and it automatically assigns an executor.

You can manage Flows using the group of methods tasks.flow.Flow.*.

User Documentation

Bitrix24 Flows: Getting Started
Scrum Tasks
Scrum tasks are standard Bitrix24 tasks with enhanced capabilities for working according to the Scrum methodology. In Scrum, the team can:

estimate task complexity using story points
attach tasks to epics
place tasks in the backlog and sprints
move tasks through the stages of the sprint during the work process
Learn more about Scrum and its methods in the article Scrum: Overview of Methods.

User Documentation

Bitrix24.Scrum
Task Management Modes
Kanban is a tool that helps visually represent task management in the form of columns and cards. Columns are stages of work, and cards are tasks. Kanban is used for managing tasks in groups and projects.

"My Planner" is a mode for managing your tasks in the form of a kanban. Each employee will have their own stages in "My Planner".

You can manage the stages of the kanban and "My Planner" using the group of methods task.stages.*.

Daily Planner
The "Daily Planner" is a list of tasks, activities, and meetings that you have scheduled for the workday. The method task.planner.getlist retrieves the list of tasks from the "Daily Planner".

Widgets
You can embed an application into the task card. With embedding, you can use the application without leaving the card.

Tab in the task card TASK_VIEW_TAB
Right panel of the task card TASK_VIEW_SIDEBAR
Link at the top of the task card TASK_VIEW_TOP_PANEL
You can embed the application in the task list:

Context menu item in the list TASK_LIST_CONTEXT_MENU
In the task management modes kanban or "My Planner," there are two more special places for embedding:

Main dropdown menu item TASK_USER_LIST_TOOLBAR, TASK_GROUP_LIST_TOOLBAR
Main dropdown menu item near robot settings TASK_ROBOT_DESIGNER_TOOLBAR
Overview of Methods and Events
Scope: task

Who can execute the method: depending on the method

Main
Method

Description

tasks.task.add

Creates a task

tasks.task.update

Updates a task

tasks.task.get

Retrieves information about a task by id

tasks.task.list

Retrieves a list of tasks

tasks.task.files.attach

Attaches files to a task

tasks.task.delegate

Delegates tasks

tasks.task.counters.get

Retrieves user counters

tasks.task.start

Changes the task status to "in progress"

tasks.task.pause

Stops task execution and changes status to "waiting for execution"

tasks.task.defer

Changes the task status to "deferred"

tasks.task.complete

Changes the task status to "completed"

tasks.task.renew

Renews a task after it has been completed

tasks.task.approve

Approves a task

tasks.task.disapprove

Rejects a task

tasks.task.delete

Deletes a task

tasks.task.startwatch

Allows watching a task

tasks.task.stopwatch

Stops watching a task

tasks.task.favorite.add

Adds tasks to favorites

tasks.task.favorite.remove

Removes tasks from favorites

tasks.task.getFields

Retrieves available fields

tasks.task.getaccess

Checks access to a task

tasks.task.history.list

Retrieves task history

tasks.task.mute

Enables "Silent" mode

tasks.task.unmute

Disables "Silent" mode

task.dependence.add

Creates a dependency of one task on another

task.dependence.delete

Deletes a dependency of one task from another









Task Result
Method

Description

tasks.task.result.addFromCommentt

Adds a comment to the result

tasks.task.result.list

Retrieves a list of task results

tasks.task.result.deleteFromComment

Deletes a comment from the task result

Checklists
Method

Description

task.checklistitem.add

Adds a new checklist item to a task

task.checklistitem.update

Updates the data of a checklist item

task.checklistitem.get

Retrieves a checklist item by its id

task.checklistitem.getlist

Retrieves a list of checklist items in a task

task.checklistitem.moveafteritem

Moves a checklist item in the list after the specified one

task.checklistitem.complete

Marks a checklist item as completed

task.checklistitem.renew

Marks a completed checklist item as active again

task.checklistitem.delete

Deletes a checklist item

task.checklistitem.isactionallowed

Checks if an action is allowed for a checklist item

task.checklistitem.getmanifest

Retrieves a list of methods and their descriptions

Comments
Method

Description

task.commentitem.add

Creates a new comment for a task

task.commentitem.update

Updates the comment data

task.commentitem.get

Retrieves a comment for a task

task.commentitem.getlist

Retrieves a list of comments for a task

task.commentitem.delete

Deletes a comment

task.commentitem.isactionallowed

Checks if an action is allowed

task.commentitem.getmanifest

Retrieves a list of methods and their descriptions

Time Tracking
Method

Description

task.elapseditem.add

Adds time spent to a task

task.elapseditem.update

Updates the parameters of a time tracking record

task.elapseditem.get

Retrieves a time tracking record by its identifier

task.elapseditem.getlist

Retrieves a list of time tracking records for a task

task.elapseditem.delete

Deletes a time tracking record

task.elapseditem.isactionallowed

Checks if an action is allowed

task.elapseditem.getmanifest

Retrieves a list of methods and their descriptions

Custom Fields
Method

Description

task.item.userfield.add

Creates a new field

task.item.userfield.update

Updates the parameters of a field

task.item.userfield.get

Retrieves a field by its identifier

task.item.userfield.getlist

Retrieves a list of fields

task.item.userfield.delete

Deletes a field

task.item.userfield.gettypes

Retrieves all available data types

task.item.userfield.getfields

Retrieves all available fields of a custom field

Kanban and "My Planner" Stages
Method

Description

task.stages.add

Adds stages to kanban or "My Planner"

task.stages.update

Updates stages of kanban or "My Planner"

task.stages.get

Retrieves stages of kanban or "My Planner"

task.stages.canmovetask

Determines if the current user can move tasks in the specified object

task.stages.movetask

Moves tasks from one stage to another

task.stages.delete

Deletes stages of kanban or "My Planner"

Daily Planner
Method

Description

task.planer.getList

Retrieves a list of tasks from the "Daily Planner"

Flows
Method

Description

tasks.flow.Flow.create

Creates a flow

tasks.flow.Flow.get

Retrieves a flow

tasks.flow.Flow.update

Modifies a flow

tasks.flow.Flow.delete

Deletes a flow

tasks.flow.Flow.isExists

Checks if a flow with that name exists

tasks.flow.Flow.activate

Enables or disables a flow

ime Tracking: Overview of Methods
Time tracking in Bitrix24 helps organize the workflow and monitor employee adherence to schedules.

Quick navigation: all methods and events

User documentation: time and reports in Bitrix24

Workday
Time tracking records the hours worked by an employee. To do this, the employee marks the start and end of the workday in the system. Managing the workday can be done using the group of methods timeman.*.

User Documentation

Worktime tracking in Bitrix24
Work Schedule
The work schedule defines the mode and duration of employees' work. You can obtain the work schedule settings using the method timeman.schedule.get.

User Documentation

Work Schedules
Time Control
Time tracking checks the compliance of an employee's working hours with the established schedule. The system records schedule violations, and the manager can view reports on these violations.

You can work with reports and configure time control using the group of methods timeman.timecontrol.*.

User Documentation

Working time control
Office Networks
An office network is a group of IP addresses used within the organization's local network. Working with the ranges of IP addresses in the office network is done using the methods from the group timeman.networkrange.*.

Overview of Methods
Scope: timeman

Who can execute the method: depending on the method

Workday
Method

Description

timeman.open

Start a new workday or resume a closed one

timeman.pause

Pause the workday

timeman.close

Close the workday

timeman.status

Get information about the user's current workday

timeman.settings

Get the user's working time settings

Work Schedule
Method

Description

timeman.schedule.get

Retrieves the work schedule by ID

Time Control
Method

Description

timeman.timecontrol.report.add

Submits a report on identified absences

timeman.timecontrol.reports.get

Retrieves a report on identified absences

timeman.timecontrol.settings.get

Retrieves the settings for the time control tool

timeman.timecontrol.settings.set

Sets the settings for the time control tool

timeman.timecontrol.reports.settings.get

Retrieves user settings for building the time control tool report interface

timeman.timecontrol.reports.users.get

Retrieves the list of users in the specified department

Office Networks
Method

Description

timeman.networkrange.get

Retrieves the ranges of network addresses included in the office network

timeman.networkrange.set

Sets the ranges of network addresses included in the office network

timeman.networkrange.check

Checks if an IP address is within the ranges of network addresses in the office network

ethods for Working with Users in Bitrix24
Scope: user

Who can perform the method: depending on the method

The methods for working with users in Bitrix24 allow inviting new users, modifying existing user data, and selecting users based on conditions. Applications that utilize these methods in their scenarios must ensure maximum security of user data and only retrieve the information about users that is truly necessary for the application's functionality.

To guarantee users the security of their personal information, there are several levels of access through the user management methods:

Limited access versions:

user_brief, which allows obtaining basic information about users without their contact details and custom fields. This scope is necessary and sufficient for scenarios where displaying the user's full name in the application interface is required.
user_basic, which allows obtaining not only basic information but also the contact details of Bitrix24 users. This scope is needed for scenarios related to making calls or sending e-mails through your application.
Full access versions:

user, which allows retrieving all standard fields and also provides the ability to invite new users and modify existing user data.
user.userfield, which grants access to methods for working with user custom fields (expands the list of available fields in the reading methods available in the scopes above) for retrieving, adding, modifying, and deleting custom fields.
Attention!

This is the maximum level of access to personal information, and it should be requested very responsibly.

Attention!

The username length must not exceed 25 characters.

Limited Versions of the User Scope
In these scopes, users cannot be added/updated: the methods user.add and user.update are not available. In all other methods for obtaining user information, only these fields are accessible (starting from version Rest 21.600.0):

user_basic	user_brief
ID	ID
XML_ID	XML_ID
ACTIVE	ACTIVE
NAME	NAME
LAST_NAME	LAST_NAME
SECOND_NAME	SECOND_NAME
TITLE	TITLE
EMAIL	IS_ONLINE
PERSONAL_PHONE	TIME_ZONE
WORK_PHONE	PERSONAL_PHOTO
WORK_POSITION	TIMESTAMP_X
WORK_COMPANY	DATE_REGISTER
IS_ONLINE	PERSONAL_PROFESSION
TIME_ZONE	PERSONAL_GENDER
TIMESTAMP_X	PERSONAL_BIRTHDAY
DATE_REGISTER	PERSONAL_CITY
LAST_ACTIVITY_DATE	PERSONAL_STATE
PERSONAL_PROFESSION	PERSONAL_COUNTRY
PERSONAL_GENDER	WORK_POSITION
PERSONAL_BIRTHDAY	WORK_CITY
PERSONAL_PHOTO	WORK_STATE
PERSONAL_PHONE	WORK_COUNTRY
PERSONAL_FAX	LAST_ACTIVITY_DATE
PERSONAL_MOBILE	UF_EMPLOYMENT_DATE
PERSONAL_PAGER	UF_TIMEMAN
PERSONAL_STREET	UF_SKILLS
PERSONAL_MAILBOX	UF_INTERESTS
PERSONAL_CITY	UF_DEPARTMENT
PERSONAL_STATE	UF_PHONE_INNER
PERSONAL_ZIP	
PERSONAL_COUNTRY	
PERSONAL_NOTES	
WORK_COMPANY	
WORK_DEPARTMENT	
WORK_POSITION	
WORK_WWW	
WORK_PHONE	
WORK_FAX	
WORK_PAGER	
WORK_STREET	
WORK_MAILBOX	
WORK_CITY	
WORK_STATE	
WORK_ZIP	
WORK_COUNTRY	
WORK_PROFILE	
WORK_LOGO	
WORK_NOTES	
UF_DEPARTMENT	
UF_DISTRICT	
UF_SKYPE	
UF_SKYPE_LINK	
UF_ZOOM	
UF_TWITTER	
UF_FACEBOOK*	
UF_LINKEDIN	
UF_XING	
UF_WEB_SITES	
UF_PHONE_INNER	
UF_EMPLOYMENT_DATE	
UF_TIMEMAN	
UF_SKILLS	
UF_INTERESTS	
*The social network is recognized as extremist and is banned in the territory of the United States.

Full Version of the User Scope
In the full version, the following fields are available (starting from version Rest 21.600.0):

user

ID

XML_ID

ACTIVE

NAME

LAST_NAME

SECOND_NAME

TITLE

EMAIL

LAST_LOGIN

DATE_REGISTER

TIME_ZONE

IS_ONLINE

TIMESTAMP_X

LAST_ACTIVITY_DATE

PERSONAL_PROFESSION

PERSONAL_GENDER

PERSONAL_WWW

PERSONAL_BIRTHDAY

PERSONAL_PHOTO

PERSONAL_ICQ

PERSONAL_PHONE

PERSONAL_FAX

PERSONAL_MOBILE

PERSONAL_PAGER

PERSONAL_STREET

PERSONAL_MAILBOX

PERSONAL_CITY

PERSONAL_STATE

PERSONAL_ZIP

PERSONAL_COUNTRY

PERSONAL_NOTES

WORK_COMPANY

WORK_DEPARTMENT

WORK_POSITION

WORK_WWW

WORK_PHONE

WORK_FAX

WORK_PAGER

WORK_STREET

WORK_MAILBOX

WORK_CITY

WORK_STATE

WORK_ZIP

WORK_COUNTRY

WORK_PROFILE

WORK_LOGO

WORK_NOTES

UF_DEPARTMENT

UF_DISTRICT

UF_SKYPE

UF_SKYPE_LINK

UF_ZOOM

UF_TWITTER

UF_FACEBOOK*

UF_LINKEDIN

UF_XING

UF_WEB_SITES

UF_PHONE_INNER

UF_EMPLOYMENT_DATE

UF_TIMEMAN

UF_SKILLS

UF_INTERESTS

*The social network is recognized as extremist and is banned in the territory of the United States.

Methods
Method

Description

user.fields

Retrieve the list of user field names

user.current

Get information about the current user

user.add

Invite a user

user.update

Update user data

user.get

Retrieve a filtered list of users

user.search

Get a list of users with accelerated search based on personal data

