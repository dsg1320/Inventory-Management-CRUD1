const db = require("../config/db");
//const XLSX = require("xlsx");
//const workbook = XLSX.readFile("data/product.xlsx");
const XlsxPopulate = require('xlsx-populate');

//GET ALL PRODUCT LIST
const getProducts = async(req,res) => {
    try{
        const data = await db.query('SELECT * FROM product');
        if(!data){
            return res.status(404).send({
                success:false,
                message:"No records found"
            });
        }
        res.status(200).send(data[0]);
    } catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error in Get all product records',
            error,
        });
    }
};

const getproductbyPrice = async(req,res)=>{
    try{
        const price=req.params.price;
        if(!price || isNaN(price))
        {
            return res.status(404).send({
                success:false,
                message:'Invalid price'
            })
        }
        const da=await db.query("Select * from product where Price=?",price);
        if(!da[0] || da[0].length==0)
        {
            return res.status(404).send({
                success:false,
                message:'no record found'
            })
        }
        res.status(200).send(da[0])
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Price Error',
            error
    })
};
}
const getproductbyID = async(req,res)=>{
    try{
        const id=req.params.id;
        if(!id || isNaN(id))
        {
            return res.status(404).send({
                success:false,
                message:'Invalid price'
            })
        }
        const da=await db.query("Select * from product where Prod_ID=?",[id]);
        if(!da[0] || da[0].length==0)
        {
            return res.status(404).send({
                success:false,
                message:'no record found'
            })
        }
        res.status(200).send(da[0])
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Price Error',
            error
    })
};
}

const getorderbyID = async(req,res)=>{
    try{
        const id=req.params.id;
        if(!id || isNaN(id))
        {
            return res.status(404).send({
                success:false,
                message:'Invalid price'
            })
        }
        const da=await db.query("Select * from orders where Order_id=?",[id]);
        if(!da[0] || da[0].length==0)
        {
            return res.status(404).send({
                success:false,
                message:'no record found'
            })
        }
        res.status(200).send(da[0])
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Price Error',
            error
    })
};
}

const getsupplierbyID = async(req,res)=>{
    try{
        const id=req.params.id;
        if(!id || isNaN(id))
        {
            return res.status(404).send({
                success:false,
                message:'Invalid price'
            })
        }
        const da=await db.query("Select * from supplier where Suppl_id =?",[id]);
        if(!da[0] || da[0].length==0)
        {
            return res.status(404).send({
                success:false,
                message:'no record found'
            })
        }
        res.status(200).send(da[0])
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Price Error',
            error
    })
};
}

const getproductbycategory = async(req,res) => {
    try{
        const category = req.params.category
        if(!category|| (typeof category !== 'string')){
            return res.status(404).send({
                success:false,
                message:'Invalid or Provide category name'
            })
        }
       // const data = await db.query(' SELECT * FROM students WHERE id='+studentId)
    const data = await db.query(`SELECT * FROM product WHERE category=?`,[category])
       if(!data[0]|| data[0].length==0){
        return res.status(404).send({
            success:false,
            messsage:'no Records found'
        })
       }
       res.status(200).send( data[0])
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error in Get product by category API',
            error
        })
    }
}

const getSupplier = async(req,res) => {
    try{
        const data = await db.query('SELECT * FROM supplier');
        if(!data){
            return res.status(404).send({
                success:false,
                message:"No records found"
            });
        }
        res.status(200).send(data[0],);
    } catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error in Get all suppliers',
            error,
        });
    }
};

const getOrder = async(req,res) => {
    try{
        const data = await db.query('SELECT * FROM orders');
        if(!data){
            return res.status(404).send({
                success:false,
                message:"No records found"
            });
        }
        res.status(200).send(data[0]);
    } catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error in Get all orders',
            error,
        });
    }
};

const getorderByPrice = async(req,res) => {
    try{
        const total_price = req.params.total_price
        if(!total_price || isNaN(total_price)){
            return res.status(404).send({
                success:false,
                message:'Invalid or Provide price'
            })
        }
       // const data = await db.query(' SELECT * FROM students WHERE id='+studentId)
    const data = await db.query(`SELECT * FROM orders WHERE amount=?`,[total_price])
       if(!data[0]|| data[0].length==0){
        return res.status(404).send({
            success:false,
            messsage:'no Records found'
        })
       }
       res.status(200).send(data[0])
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error in Get order by price API',
            error
        })
    }
}

const getorderByQuantity = async(req,res) => {
    try{
        const quantity = req.params.quantity
        if(!quantity || isNaN(quantity)){
            return res.status(404).send({
                success:false,
                message:'Invalid or Provide price'
            })
        }
       // const data = await db.query(' SELECT * FROM students WHERE id='+studentId)
    const data = await db.query(`SELECT * FROM orders WHERE quantity=?`,[quantity])
       if(!data[0] || data[0].length==0){
        return res.status(404).send({
            success:false,
            messsage:'no Records found'
        })
       }
       res.status(200).send(data[0])
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error in Get order by price API',
            error
        })
    }
}

const deleteprodbyid = async(req,res)=>{
    try{
        const id=req.params.id;
        if(!id || isNaN(id))
        {
            return res.status(404).send({
                success:false,
                message:'Invalid id'
            })
        }
        //await db.query("Delete from orders where prod_id=?",[id]);
        const da = await db.query('SELECT * FROM product WHERE Prod_ID =?',[id]);
        if(!da[0] || da[0].length==0){
            return res.status(500).send({
                success:false,
                message:'ID not Found'
            });
        }
        await db.query('DELETE from product WHERE prod_ID=?',[id]);
        res.status(200).send({
            success:true,
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Product id error',
            error,
        });
    }
};
const deletesupplybyid = async(req,res)=>{
    try{
        const id=req.params.id;
        if(!id || isNaN(id))
        {
            return res.status(404).send({
                success:false,
                message:'Invalid id'
            })
        }
        const da = await db.query('SELECT * FROM supplier WHERE Suppl_id =?',[id]);
        if(!da[0] || da[0].length==0){
            return res.status(500).send({
                success:false,
                message:'ID not Found'
            });
        }
        await db.query("Delete from supplier where Suppl_id=?",[id]);
        //Since only one supplier for each product a deletion from suppler id must also include deletion from product table
        
        res.status(200).send({
            success:true,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Supplier id error',
            error,
        });
    }
};

const deleteorderbyid = async(req,res)=>{
    try{
        const id=req.params.id;
        if(!id || isNaN(id))
        {
            return res.status(404).send({
                success:false,
                message:'Invalid id'
            })
        }
        const da = await db.query('SELECT * FROM orders WHERE Order_id =?',[id]);
        if(!da[0] || da[0].length==0){
            return res.status(500).send({
                success:false,
                message:'ID not Found'
            });
        }
        await db.query("Delete FROM orders WHERE Order_id=?",[id]);
        res.status(200).send({
            success:true,
        })
        }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Order id error',
            error,
        });
    }
};

const exportToExcel = async (req,res) => {
    try {
        const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
        const filename = `exported_data_${timestamp}.xlsx`;
        const workbook = await XlsxPopulate.fromBlankAsync();
        const phead= ['Product id','Product Name','Price','Supplier','Category'];
        const ohead= ['Order ID','Quantity','Amount','Product ID','Supplier ID'];
        const shead = ['Supplier ID','Supplier Name','Phone'];
        // Export data from "products" table to the first sheet
        const productSheet = workbook.sheet(0);
        productSheet.name('Products'); // Set sheet name
        phead.forEach((header,column)=>{
            productSheet.cell(1,column+1).value(header);
        });
        const [products] = await db.query('SELECT * FROM product');
        products.forEach((product, index) => {
            index=index+2;
            productSheet.cell(index, 1).value(product.Prod_ID);
            productSheet.cell(index, 2).value(product.name);
            productSheet.cell(index, 3).value(product.Price);
            productSheet.cell(index, 4).value(product.s_id);
            productSheet.cell(index, 5).value(product.category);
            
        });

        // Export data from "orders" table to the second sheet
        const orderSheet = workbook.addSheet('Orders'); // Set sheet name
        ohead.forEach((header,column)=>{
            orderSheet.cell(1,column+1).value(header);
        });
        const [orders] = await db.query('SELECT * FROM orders');
        orders.forEach((order, index) => {
            index=index+2;
            orderSheet.cell(index, 1).value(order.Order_id);
            orderSheet.cell(index, 2).value(order.quantity);
            orderSheet.cell(index, 3).value(order.amount);
            orderSheet.cell(index, 4).value(order.prod_id);
            orderSheet.cell(index, 5).value(order.sup_id);
        });

        // Export data from "supplier" table to the third sheet
        const supplierSheet = workbook.addSheet('Supplier'); // Set sheet name
        shead.forEach((header,column)=>{
            supplierSheet.cell(1,column+1).value(header);
        });
        const [suppliers] = await db.query('SELECT * FROM supplier');
        suppliers.forEach((supplier, index) => {
            index=index+2;
            supplierSheet.cell(index, 1).value(supplier.Suppl_id);
            supplierSheet.cell(index, 2).value(supplier.name);
            supplierSheet.cell(index, 3).value(supplier.phone);
        });

        // Save the workbook
        const excelBuffer = await workbook.outputAsync();
        res.setHeader('Content-Disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(excelBuffer);
        console.log('Excel file exported successfully.');
        res.status(200).send({
            success:true,
        })
    } catch (error) {
        console.error('Error exporting to Excel:', error);
    }
};

const updateproduct= async(req,res)=>{
    try{
        const id = req.params.id
        if(!id || isNaN(id)){
            return res.status(404).send({
                success:false,
                message:'Invalid ID'
            })
        }
        const {name,category,Price,s_id} = req.body
        const da = await db.query('SELECT * FROM product WHERE Prod_ID =?',[id]);
        if(!da[0] || da[0].length==0){
            return res.status(500).send({
                success:false,
                message:'ID not Found'
            });
        }
        const data = await db.query('UPDATE product SET name=?,category=?,Price=?,s_id=? WHERE Prod_ID =?',[name,category,Price,s_id,id])
        if(!data){
            return res.status(500).send({
                success:false,
                message:'Error in Update'
            });
        }
        res.status(200).send({
            success:true,
            message: 'Product Updated',
        });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error in Update product',
        })
    }
};

const updatesupplier= async(req,res)=>{
    try{
        const id = req.params.id
        if(!id || isNaN(id)){
            return res.status(404).send({
                success:false,
                message:'Invalid ID'
            })
        }
        const {name,phone} = req.body
        const da = await db.query('SELECT * FROM supplier WHERE Suppl_id =?',[id]);
        if(!da[0] || da[0].length==0){
            return res.status(500).send({
                success:false,
                message:'ID not Found'
            });
        }
        const data = await db.query('UPDATE supplier SET name=?,phone=? WHERE Suppl_id =?',[name,phone,id])
        if(!data){
            return res.status(500).send({
                success:false,
                message:'Error in Update'
            });
        }
        res.status(200).send({
            success:true,
            message: 'Suppliers Updated',
        });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error in Update supplier',
        })
    }
};

const updateorders= async(req,res)=>{
    try{
        const id = req.params.id
        if(!id || isNaN(id)){
            return res.status(404).send({
                success:false,
                message:'Invalid ID'
            })
        }
        const {quantity,amount,prod_id,sup_id} = req.body
        const da = await db.query('SELECT * FROM orders WHERE Order_id =?',[id]);
        if(!da[0] || da[0].length==0){
            return res.status(500).send({
                success:false,
                message:'ID not Found'
            });
        }
        const data = await db.query('UPDATE orders SET quantity=?,amount=?,prod_id=?,sup_id=? WHERE Order_id =?',[quantity,amount,prod_id,sup_id,id])
        if(!data || data.length==0){
            return res.status(500).send({
                success:false,
                message:'Error in Update'
            });
        }
        res.status(200).send({
            success:true,
            message: 'Orders Updated',
        });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error in Update Orders',
        })
    }
};

const insertproduct = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        let products = req.body;
        if (!Array.isArray(products)) {
                products = [products];
            }
        if(products.length === 0) {
            return res.status(400).send({
                success: false,
                message: 'No products provided in the request body or invalid format'
            });
        }

        for (const product of products) {
            const { name, Price, s_id, category } = product;
            if (!name || !Price || !s_id || !category) {
                return res.status(400).send({
                    success: false,
                    message: 'Invalid product format'
                });
            }

        const result = await db.query('INSERT INTO product (name, Price, s_id, category) VALUES (?,?,?,?)', [ product.name, product.Price, product.s_id, product.category]);
        
        if (!result || result.affectedRows === 0) {
            return res.status(500).send({
                success: false,
                message: 'Error inserting products'
            });
        }
    }
        res.status(201).send({
            success: true,
            message: 'Products inserted successfully'
        });
    } catch (error) {
        console.error('Error inserting products:', error);
        res.status(500).send({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}

const insertpro = async (req, res) => {
    try {
        // Hardcoded values for testing
        const product = {
            Prod_ID: 1001,
            name: 'Xiaomi',
            Price: 50000,
            s_id: 3,
            category: 'mobile'
        };

        // Database query with hardcoded values
        const result = await db.query('INSERT INTO product (Prod_ID, name, Price, s_id, category) VALUES (?,?,?,?,?)', [product.Prod_ID, product.name, product.Price, product.s_id, product.category]);

        if (!result || result.affectedRows === 0) {
            return res.status(500).send({
                success: false,
                message: 'Error inserting product'
            });
        }

        res.status(201).send({
            success: true,
            message: 'Product inserted successfully'
        });
    } catch (error) {
        console.error('Error inserting product:', error);
        res.status(500).send({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};




const insertOrder = async(req, res) => {
    try {
        console.log('Request Body:', req.body);
        let orders = req.body; // Assuming the request body contains an array of products
        if (!Array.isArray(orders)) {
            orders = [orders];
        }
        if(orders.length === 0) {
            return res.status(400).send({
                success: false,
                message: 'No products provided in the request body or invalid format'
            });
        }

        for (const order of orders) {
            const { quantity, amount,prod_id, sup_id } = order;
            if (!quantity || !amount || !prod_id || !sup_id) {
                return res.status(400).send({
                    success: false,
                    message: 'Invalid product format'
                });
            }

        const result = await db.query('INSERT INTO orders (quantity, amount,prod_id, sup_id) VALUES (?,?,?,?)', [order.quantity,order.amount,order.prod_id,order.sup_id]);
        
        if (!result|| result.affectedRows) {
            return res.status(500).send({
                success: false,
                message: 'Error inserting products'
            });
        }
    }
        res.status(201).send({
            success: true,
            message: 'Products inserted successfully'
        });
    } catch (error) {
        console.error('Error inserting products:', error);
        res.status(500).send({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const insertsupplier = async(req, res) => {
    try {
        console.log('Request Body:', req.body);
        let supplier = req.body;
        if (!Array.isArray(supplier)) {
            supplier = [supplier];
        } // Assuming the request body contains an array of products
        if (supplier.length === 0) {
            return res.status(400).send({
                success: false,
                message: 'No products provided in the request body or invalid format'
            });
        }

        for (const suppliers of supplier) {
            const { name,phone } = suppliers;
            if ( !name || !phone) {
                return res.status(400).send({
                    success: false,
                    message: 'Invalid product format'
                });
            }

        const result = await db.query('INSERT INTO supplier (name,phone) VALUES (?,?)', [suppliers.name,suppliers.phone])
        console.log('Result:', result);
        if (!result || result.affectedRows) {
            return res.status(500).send({
                success: false,
                message: 'Error inserting products'
            });
        }
    }
        res.status(201).send({
            success: true,
            message: 'Products inserted successfully'
        });
    } catch (error) {
        console.error('Error inserting products:', error);
        res.status(500).send({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};





module.exports = { getProducts,getproductbycategory,getproductbyPrice, getSupplier,getOrder,getorderByPrice, getorderByQuantity,deleteprodbyid, deleteorderbyid,deletesupplybyid,exportToExcel,updateproduct,updatesupplier,updateorders,insertOrder,insertsupplier,insertproduct,insertpro,getproductbyID,getorderbyID,getsupplierbyID };