using Full_Stack_Developer_Home_Assignment.Models;
using Full_Stack_Developer_Home_Assignment.Providers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Update.Internal;

namespace Full_Stack_Developer_Home_Assignment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly TaskProvider _taskProvider;
        
        public TaskController(TaskProvider taskProvider)
        {
           _taskProvider = taskProvider;
        }

        [HttpGet("{email}")]
        public async Task<ActionResult<List<MyTask>>> Get(string email)
        {
            var tasks = await _taskProvider.GetAllUserTasks(email);
            if (tasks.Value == null)
            {
                return NotFound(); // Return 404 if no tasks are found
            }
            return Ok(tasks); // Return 200 OK with the list of tasks
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody]MyTask taskToAdd)
        {
           var res = await _taskProvider.AddTask(taskToAdd);
            return Ok(res);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id , [FromBody]MyTask taskToUpdate)
        {
            var res = await _taskProvider.UpdateTask(id, taskToUpdate);
            return Ok(res);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var res = await _taskProvider.DeleteTask(id);
            return Ok(res);
        }

    }
}
