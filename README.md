# paytmcolen_sortof

- Below instructions must be followed to run the application

  1. set environment variable key 
    such as: set KantaasSecretKey=mykey
  2. run the appliction 
  3. one must attache the token while accessing the apis
  
- List of Apis

1.User Registration 

http://localhost:8000/user/registration

pass data in body as below

{
     
   "Email":"samir@gmail.com",
     "Password": "samir123",
     "ConfirmPassword": "samir123",
     "UserType": "customer",
     "UserCode": "54356676565988964589",
     "Contact":9448184425
}

2.User login

http://localhost:8000/user/login/authentication
user can login only by registered email and password
{
     
  "Email":"samir@gmail.com",
     "Password": "samir123"
}

3.add money to wallet

http://localhost:8000/user/addmoney
pass data in the body as below

{
   "Contact":8866203493,
   "amount":200
}

4.send money to others 
http://localhost:8000/user/sendmoney

pass require details in body
{
   "sendercontact":8866203493,
   "recievercontact":9448184422,
   "amount":92
}

5.customers all transactions

http://localhost:8000/users/alltransactions/8866203493

6. admin can see customer's balance 
  user role must be admin
http://localhost:8000/users/allusers/userrole


