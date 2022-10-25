import React, { FC, useState } from 'react';
//import { useAutoAnimate } from "@formkit/auto-animate/react";


import { EditorContent } from './editor.content';
import { EditorSetting } from './editor.setting';
import { EditorDesign } from './editor.design';
import { Box, BoxHeader, BoxMain, BoxFooter } from '../box';
import { EditorProps } from './editor.type';
import { EditorProvider } from './editor.context';
import { Render } from './editor.render';
import { EditorTab } from './editor.tab';

export const Editor: FC<EditorProps> = (props) => {

  return <EditorProvider {...props}>
    <Box>
      <BoxHeader>
        <EditorTab />
      </BoxHeader>
      <BoxMain>
        <Render />
      </BoxMain>
      <BoxFooter>
      </BoxFooter>
    </Box>
  </EditorProvider>
}


/*
{!tab && name}
{tab && <button name='' type='button' onClick={handleTabClick}>back</button>}
//
{
  !tab && <nav className='editor-tab'>
    {Object.keys(data).map((key) => {
      return <div key={key}><button className={(tab == key) ? 'active' : ''} name={key} type='button' onClick={handleTabClick}>{key}</button></div>
    })}
  </nav>
}
{
  tab && <main className='editor-main'>
    {Object.keys(data).map((key, i) => {
      switch (key) {
        case 'content':
          return (tab == key) && <EditorContent key={key} data={data[key]} onChange={onChange} />;
        case 'style':
          return (tab == key) && <EditorDesign key={key} />;
        case 'setting':
          return (tab == key) && <EditorSetting key={key} />;
        default:
          return <></>
      }
    })}
  </main>
} 
//
<button name='cancel' type='button' onClick={onClick}>Cancel</button>



return <div className={(isDragging && dragType !== 'editor') ? 'editor hidden' : 'editor'}>
    <header className='editor-header' ref={ref}>
      {!tab && name}
      {tab && <button name='' type='button' onClick={handleTabClick}>back</button>}
    </header>
    <div>
      {
        !tab && <nav className='editor-tab'>
          {Object.keys(data).map((key) => {
            return <div key={key}><button className={(tab == key) ? 'active' : ''} name={key} type='button' onClick={handleTabClick}>{key}</button></div>
          })}
        </nav>
      }
      {
        tab && <main className='editor-main'>
          {Object.keys(data).map((key, i) => {
            switch (key) {
              case 'content':
                return (tab == key) && <EditorContent key={key} data={data[key]} onChange={onChange} />;
              case 'style':
                return (tab == key) && <EditorDesign key={key} />;
              case 'setting':
                return (tab == key) && <EditorSetting key={key} />;
              default:
                return <></>
            }
          })}
        </main>
      }
    </div>
    <footer className='editor-footer'>
      <button name='cancel' type='button' onClick={onClick}>Cancel</button>
    </footer>
  </div>

*/