import { DefaultInput } from '../DefaultInput';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { PlayCircleIcon } from 'lucide-react';

export function MainForm() {
    return(
        <form action="" className='form'>
          <div className='formRow'>
            <DefaultInput labelText='Task' type='text' id='input' placeholder='Digite algo'/>
          </div>
          <div className='formRow'>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div className='formRow'>
            <Cycles labelText='Ciclos'/>
          </div>
          <div className='formRow'>
            <DefaultButton icon={<PlayCircleIcon/>}/>
          </div>
        </form>
    )
}