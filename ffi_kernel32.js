'use strict';

const path = require('path');


const ref = require('ref');
const sizeof = require('ref-sizeof');
const struct = require('ref-struct');
//const union = require('ref-union');
//const array_t = require('ref-array');

const ffi = require('ffi');
const arch_x64 = (process.arch === 'x64');

var lib_kernel32 = ffi.DynamicLibrary( "kernel32.dll" );


var declare_table = {

  "GetCurrentProcess" : [ "void*" ,  [ ] , ffi.FFI_STDCALL ] ,

  "lstrlenA" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,
  "lstrlenW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

    "_dummy" : null 
};

var api_name = null;
var api_declare = null;
var api_address = null;

for ( api_name in declare_table )
{
    if ( '_dummy' != api_name )
    {
        api_declare = declare_table[ api_name ];

        try
        {
            api_address = lib_kernel32.get( api_name );
        }
        catch(err)
        {
            api_address = null;
        }
    }
    else
    {
        api_address = null;
    }

    if ( api_address )
    {
        var argv_ffi = declare_table[ api_name ];

        argv_ffi.unshift( api_address );

        exports[ api_name ] = ffi.ForeignFunction.apply( this , argv_ffi );
    }
}

//----------------------------------------------------------------------