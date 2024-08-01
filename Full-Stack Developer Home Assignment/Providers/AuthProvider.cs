using Full_Stack_Developer_Home_Assignment.Date;
using Full_Stack_Developer_Home_Assignment.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Full_Stack_Developer_Home_Assignment.Providers
{
    public class AuthProvider
    {
        private readonly DataContext _context;
        public AuthProvider(DataContext context)
        {
            _context = context;        
        }


        public async Task<IActionResult> Register(User user)
        {
            if (user == null)
            {
                return new BadRequestObjectResult(new { success = false, message = "Invalid user data" });
            }            

            try
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return new OkObjectResult(new { success = true, message = "User registered successfully" });
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"{ex.Message}", ex);

                return new StatusCodeResult(409);
            }
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
    }
}
