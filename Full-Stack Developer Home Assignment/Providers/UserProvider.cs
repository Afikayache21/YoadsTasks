using Full_Stack_Developer_Home_Assignment.Date;
using Full_Stack_Developer_Home_Assignment.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace Full_Stack_Developer_Home_Assignment.Providers
{
    public class UserProvider
    {

        private readonly DataContext _context;


        public UserProvider(DataContext context)
        {
            this._context = context;
        }


        public async Task<ActionResult<List<User>>> GetAllUsers()
        {
            try
            {
                var users = await _context.Users.ToListAsync();
                return new ActionResult<List<User>>(users);
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine(ex + "Error fetching users");

                return new StatusCodeResult(500); // Internal Server Error
            }
        }
       

        public async Task<ActionResult<User>> ValidateUser(User loginRequest)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginRequest.Email && u.Password == loginRequest.Password);
                
                return new ActionResult<User>(user);
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine(ex + "Error fetching users");

                return new StatusCodeResult(500); // Internal Server Error
            }
        }

        public async Task<bool> DeleteUserByEmail(string email)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
            if (user == null)
            {
                return false;
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateUserByEmail(User toUpdate)
        {
            var existingUser = await _context.Users.SingleOrDefaultAsync(u => u.Email == toUpdate.Email);
            if (existingUser == null)
            {
                return false; // User not found
            }

            if (toUpdate == null)
            {
                return false; // No update information provided
            }

            // Update relevant fields
            existingUser.Password = toUpdate.Password;
            // Update other fields as necessary

            _context.Users.Update(existingUser);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
