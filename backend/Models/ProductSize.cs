﻿namespace backend.Models
{
    public class ProductSize
    {
        public int ProductSizeID { get; set; }
        public int Size { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public int ProductID { get; set; }

        public ProductSize(int productSizeID, int size, decimal price, int quantity, int productID )
        {
            ProductSizeID = productSizeID;
            Size = size;
            Price = price;
            Quantity = quantity;
            ProductID = productID;
        }
    }
}
