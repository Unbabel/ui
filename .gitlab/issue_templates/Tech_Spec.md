## Description

> Describe the Goal we want to achieve with this issue
>
> Ex.
```
The e-mail registration phase allows the user to pre-register at unbabel using e-mail only.
After submiting a valid e-mail the user will receive a link with which the user account can be setup.
This feature will act as e-mail verification.
```

## User flow
> Detail the steps that one must perform to complete the task.
>
> Ex.
```
* User access the register page on one of Unbabel's Apps
* User submits e-mail in text box.
* User receives registration link
* Email validation should be done on the frontend side
```

## Technical specs


#### Data Model
> If possible specify the data model to provide context over the objects
> ![Diagramming-Students-and-Teachers-ERD-Sample48](/uploads/8e820c58ea6dfee8fd5a0ec45ca68ef0/Diagramming-Students-and-Teachers-ERD-Sample48.png)


#### Sequence Diagram
> Insert a sequence diagram or a business process model illustration and specify the whole flow.
> Ex.  
![interaction-sequence](https://gitlab.com/Unbabel/argonath/raw/master/resources/images/signup.png)


#### Pseudo Code
> For each method identified detail what should be the inputs, outputs and validations performed, as well as pseudo code describing how the data will be manipulated.
> Ex.  
```
>
> 1) App sends Argonath the user e-mail using the following request:
>
> POST /user/registration
>
>
> Headers:
> X-ARGONATH-TOKEN
>
> Body:
> email STRING
>
> 2) Argonath validates App token using X-ARGONATH-TOKEN  
> 3) Argonath validates e-mail:  
> no duplicates allowed
> valid e-mail
>
> 4) Argonath creates user record in User Table and sets status to pre-registered  
> 5) Argonath creates a verification token associated with this user and the app  
>
> valid within 48 hours
> token_urlsafe (32)
>
> 6) Argonath replies:
>
> Response Code: 200
>
> Encoded with JWT:
> {
>   'verification_token': '<token>'
> }
```

#### Metrics Affection
> Define the Metrics are affected and what are the changes needed to update the metrics
>

### Non functional requirements
> Identify and specify any non functional requirements. Please define concrete results when setting NFRs.
> Ex.  
>
```
Good: An order process should not take more than 500 ms to create tasks
Bad: The order process should be quick
```


## Tasks and Timeline

> Please add a rough timeline for the tasks described in here.


----
/label ~techspec
/assign @johnsardine
