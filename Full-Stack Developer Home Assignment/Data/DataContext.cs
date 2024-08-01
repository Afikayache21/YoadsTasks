using Full_Stack_Developer_Home_Assignment.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace Full_Stack_Developer_Home_Assignment.Date
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<MyTask> Tasks { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure primary key for User
            modelBuilder.Entity<User>().HasKey(u => u.Email);

            // Configure the one-to-many relationship between User and MyTask
            modelBuilder.Entity<User>()
                .HasMany(u => u.Tasks)
                .WithOne()
                .HasForeignKey(t => t.Email)
                .IsRequired();
        }
    }
}
