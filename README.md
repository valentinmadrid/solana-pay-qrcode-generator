Plancian is a Merchant Plattform designed for local merchants to integrate Solana Pay.

You will have the ability to access your customers as well as all of your Sales trough the Dashboard.

If you want to clone this project, you will need a Supabase Instance(Local or in the Cloud). Supabase is an open source Firebase Alternative.
You will have to create two tables, one called "transactions" and one called "stores"

In the "transactions" table insert these rows= "id" as varchar, "sender" as varchar, "receiver" as varchar, "amount" as varchar, "success" as boolean, "userid" as varchar, "created_at" as timestamp, "currency" as varchar and "description" as varchar.

In the "stores" table insert these rows= "owner" as the unique identifier+ as varchar, "url" as varchar, "name" as varchar, "description" as varchar, "wallet" as varchar, "id" as an integer, "totalprofit" as an int, "totalcustomers" as an int.

If you just want to check the project out, here's the demo: 


