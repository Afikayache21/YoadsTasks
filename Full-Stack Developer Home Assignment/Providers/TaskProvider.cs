using Full_Stack_Developer_Home_Assignment.Date;
using Full_Stack_Developer_Home_Assignment.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Full_Stack_Developer_Home_Assignment.Providers
{
    public class TaskProvider
    {
        private readonly DataContext _context;

        public TaskProvider(DataContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<List<MyTask>>> GetAllUserTasks(string email)
        {
            try
            {
                var tasks = await _context.Tasks.Where(t => t.Email == email).ToListAsync();
                return new ActionResult<List<MyTask>>(tasks);
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine(ex + "Error fetching users");
                return new ObjectResult("Internal server error: " + ex.Message) { StatusCode = 500 };
            }
        }

        public async Task<IActionResult> AddTask(MyTask taskToAdd)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == taskToAdd.Email);
                if (user == null)
                {
                    return new NotFoundResult(); // Return 404 if user is not found
                }

                user.Tasks.Add(taskToAdd);
                await _context.SaveChangesAsync(); // Save changes to the database

                return new StatusCodeResult(200); // Return 200 OK
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine(ex + "Error adding task");
                return new ObjectResult("Internal server error: " + ex.Message) { StatusCode = 500 };
            }
        }

        public async Task<IActionResult> DeleteTask(int id)
        {
            try
            {
                var task = await _context.Tasks.FindAsync(id);
                if (task == null)
                {
                    return new NotFoundResult(); // Return 404 if task is not found
                }

                _context.Tasks.Remove(task);
                await _context.SaveChangesAsync(); // Save changes to the database

                return new StatusCodeResult(200); // Return 200 OK
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine(ex + "Error deleting task");
                return new ObjectResult("Internal server error: " + ex.Message) { StatusCode = 500 };
            }
        }

        public async Task<IActionResult> UpdateTask(int id, MyTask taskToUpdate)
        {
            if (id != taskToUpdate.Id)
            {
                return new BadRequestResult(); // Return 400 Bad Request
            }

            var existingTask = await _context.Tasks.FindAsync(id);
            if (existingTask == null)
            {
                return new NotFoundResult(); // Return 404 if task is not found
            }

            // Update the task properties
            existingTask.Title = taskToUpdate.Title;
            existingTask.Description = taskToUpdate.Description;
            existingTask.DueDate = taskToUpdate.DueDate;
            existingTask.IsCompleted = taskToUpdate.IsCompleted;

            try
            {
                await _context.SaveChangesAsync(); // Save changes to the database
                return new StatusCodeResult(200); // Return 200 OK
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine(ex + "Error updating task");
                return new ObjectResult("Internal server error: " + ex.Message) { StatusCode = 500 };
            }
        }
    }
}
